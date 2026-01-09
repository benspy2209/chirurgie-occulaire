import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) throw new Error('No file uploaded')
    
    // 1. Validate File Size (Max 10MB)
    // Edge functions have memory limits, but 10MB stream is manageable usually.
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File too large (max 10MB)')
    }

    // 2. Validate File Type (Binary Magic Bytes Check)
    // We read the first 4 bytes to ensure it is a PDF (%PDF)
    const fileBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(fileBuffer.slice(0, 4))
    const isPdf = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46
    
    if (!isPdf) {
      throw new Error('Invalid file format. Only PDF files are accepted.')
    }

    // Initialize Supabase Admin Client (Service Role)
    // This allows writing to the private bucket and DB even with strict RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 3. Upload to Storage (Private Bucket 'referrals')
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

    // 4. Insert into Database
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

    // 5. Send Email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (resendApiKey) {
      // Generate a temporary signed URL for the doctor (valid 7 days)
      const { data: signedUrlData } = await supabase.storage
        .from('referrals')
        .createSignedUrl(storageData.path, 60 * 60 * 24 * 7)

      const downloadLink = signedUrlData?.signedUrl 
        ? `<a href="${signedUrlData.signedUrl}" style="color: #0f172a; font-weight: bold;">Télécharger le dossier (PDF)</a>` 
        : '<em>Fichier disponible dans le dashboard sécurisé.</em>'

      // Use environment variable for destination or fallback to a default for safety
      const doctorEmail = Deno.env.get('DOCTOR_EMAIL') || 'doctor@example.com'
      const fromEmail = 'Referral System <onboarding@resend.dev>' // Should be configured with verified domain

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
    }

    return new Response(
      JSON.stringify({ message: 'Success' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || String(error) }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})