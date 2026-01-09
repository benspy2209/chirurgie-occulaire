import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // 1. Handle CORS Preflight Request immediately
  // We return 200 OK (instead of 204) to ensure maximum compatibility with proxies/gateways
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }

  try {
    // Check if Request Body is empty
    if (!req.body) {
        throw new Error("Request body is empty");
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) throw new Error('No file uploaded')
    
    // Validate File Size (Max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File too large (max 10MB)')
    }

    // Validate File Type (Binary Magic Bytes Check for PDF)
    const fileBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(fileBuffer.slice(0, 4))
    const isPdf = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46
    
    if (!isPdf) {
      throw new Error('Invalid file format. Only PDF files are accepted.')
    }

    // Initialize Supabase Admin Client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Server configuration error: Missing Supabase credentials');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Upload to Storage
    const name = formData.get('name') as string
    const sanitizedName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const timestamp = Date.now()
    const fileName = `${timestamp}_${sanitizedName}.pdf`

    const { data: storageData, error: storageError } = await supabase.storage
      .from('referrals')
      .upload(fileName, fileBuffer, {
        contentType: 'application/pdf',
        upsert: false
      })

    if (storageError) throw new Error(`Storage Error: ${storageError.message}`)

    // Insert into Database
    const { error: dbError } = await supabase
      .from('referrals')
      .insert({
        full_name: name,
        birth_date: formData.get('birthDate'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message'),
        file_path: storageData.path,
        status: 'new'
      })

    if (dbError) throw new Error(`Database Error: ${dbError.message}`)

    // Send Email via Resend (Optional)
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (resendApiKey) {
      try {
        const { data: signedUrlData } = await supabase.storage
          .from('referrals')
          .createSignedUrl(storageData.path, 60 * 60 * 24 * 7)

        const downloadLink = signedUrlData?.signedUrl 
          ? `<a href="${signedUrlData.signedUrl}" style="color: #0f172a; font-weight: bold;">Télécharger le dossier (PDF)</a>` 
          : '<em>Fichier disponible dans le dashboard sécurisé.</em>'

        const doctorEmail = Deno.env.get('DOCTOR_EMAIL') || 'doctor@example.com'
        const fromEmail = 'Referral System <onboarding@resend.dev>'

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: fromEmail,
            to: doctorEmail,
            subject: `[Patient] Nouvelle référence : ${name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0f172a;">Nouvelle demande de référence</h2>
                <div style="background: #f8fafc; padding: 20px; border-radius: 4px; border: 1px solid #e2e8f0;">
                  <p><strong>Patient :</strong> ${name}</p>
                  <p><strong>Né(e) le :</strong> ${formData.get('birthDate')}</p>
                  <p><strong>Téléphone :</strong> ${formData.get('phone')}</p>
                  <p><strong>Email :</strong> ${formData.get('email')}</p>
                  <p><strong>Adresse :</strong> ${formData.get('address')}</p>
                  <br/>
                  <p><strong>Message :</strong></p>
                  <p style="white-space: pre-wrap; color: #475569;">${formData.get('message') || 'Aucun message.'}</p>
                </div>
                <div style="margin-top: 20px; text-align: center;">
                   ${downloadLink}
                </div>
              </div>
            `
          })
        })
      } catch (emailError) {
        // Log email error but do not fail the request since data is saved
        console.error("Email sending failed:", emailError);
      }
    }

    return new Response(
      JSON.stringify({ message: 'Success' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error("Edge Function Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || String(error) }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})