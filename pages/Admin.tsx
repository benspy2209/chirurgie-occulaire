import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useContent } from '../components/ContentContext';
import { Lock, LogOut, Save, RefreshCw, AlertCircle, CheckCircle, Image as ImageIcon, UploadCloud, Trash2, Plus } from 'lucide-react';
import { SiteContent } from '../types';

// Whitelist of allowed emails
const ALLOWED_EMAILS = [
  'debruijneb@gmail.com',
  'r.dewispelaere@cliniqueleverseau.be'
];

const Admin: React.FC = () => {
  const { content, refreshContent } = useContent();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Edit State
  const [editData, setEditData] = useState<Record<string, SiteContent> | null>(null);
  const [activeTab, setActiveTab] = useState<'fr' | 'en'>('fr');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Initialize edit data when content loads
  useEffect(() => {
    if (content) {
      setEditData(JSON.parse(JSON.stringify(content))); // Deep copy
    }
  }, [content]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSave = async () => {
    if (!editData) return;
    setSaveStatus('saving');

    try {
      // 1. Check if a row exists
      const { data: existingData } = await supabase
        .from('site_content')
        .select('id')
        .limit(1)
        .single();

      let error;
      
      if (existingData) {
        // Update
        const { error: updateError } = await supabase
          .from('site_content')
          .update({ content: editData, updated_at: new Date() })
          .eq('id', existingData.id);
        error = updateError;
      } else {
        // Insert
        const { error: insertError } = await supabase
          .from('site_content')
          .insert([{ content: editData }]);
        error = insertError;
      }

      if (error) throw error;

      setSaveStatus('success');
      await refreshContent(); // Update the live site context
      setTimeout(() => setSaveStatus('idle'), 3000);
      
    } catch (err: any) {
      console.error('Save error:', err);
      setSaveStatus('error');
    }
  };

  const updateField = (path: string[], value: any) => {
    if (!editData) return;
    
    const newData = { ...editData };
    let current: any = newData;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setEditData(newData);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const pathKey = path.join('.');
    setUploadingField(pathKey);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to 'images' bucket
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (data && data.publicUrl) {
        updateField(path, data.publicUrl);
      }
    } catch (error: any) {
      alert('Erreur upload: ' + error.message);
    } finally {
      setUploadingField(null);
    }
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
      e.preventDefault();
      const element = document.getElementById(`section-${sectionId}`);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  // --- RENDERING ---

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="bg-slate-100 p-3 rounded-full">
              <Lock className="w-6 h-6 text-slate-700" />
            </div>
          </div>
          <h1 className="text-2xl font-light text-center text-slate-900 mb-6">Administration</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-slate-900 focus:border-slate-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-slate-900 focus:border-slate-900"
                required
              />
            </div>
            
            {loginError && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {loginError}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Security Check
  if (session.user.email && !ALLOWED_EMAILS.includes(session.user.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Accès non autorisé</h2>
          <p className="text-slate-600 mb-4">Votre email ({session.user.email}) n'a pas les droits d'administration.</p>
          <button onClick={handleLogout} className="text-slate-900 underline">Se déconnecter</button>
        </div>
      </div>
    );
  }

  // Helper to render form fields recursively
  const renderFields = (data: any, path: string[]) => {
    if (typeof data === 'string') {
      const isLongText = data.length > 60;
      
      // Basic detection for image fields (by key name or value content)
      const isImage = 
        path[path.length-1].toLowerCase().includes('image') || 
        path[path.length-1].toLowerCase().includes('photo') || 
        path[path.length-1].toLowerCase().includes('map_url') ||
        (data.startsWith('http') && (data.match(/\.(jpeg|jpg|gif|png|webp)$/) != null));

      const pathKey = path.join('.');
      const isUploading = uploadingField === pathKey;

      return (
        <div className="mb-4" key={pathKey}>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">
            {path[path.length - 1].replace(/_/g, ' ')}
          </label>
          
          <div className="space-y-2">
            {isLongText && !isImage ? (
              <textarea
                value={data}
                onChange={(e) => updateField(path, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-slate-900 focus:border-slate-900 text-sm"
                rows={4}
              />
            ) : (
              <div className="flex gap-2">
                <input
                    type="text"
                    value={data}
                    onChange={(e) => updateField(path, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded focus:ring-slate-900 focus:border-slate-900 text-sm"
                />
                {/* Image Upload Button */}
                {isImage && (
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, path)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={isUploading}
                        />
                        <button 
                            type="button"
                            className={`px-3 py-2 rounded text-white text-sm flex items-center ${isUploading ? 'bg-slate-400' : 'bg-slate-700 hover:bg-slate-600'}`}
                        >
                            {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                        </button>
                    </div>
                )}
              </div>
            )}
            
            {/* Image Preview */}
            {isImage && data.startsWith('http') && !data.includes('maps.google') && (
                <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded w-fit">
                    <img src={data} alt="Preview" className="h-24 w-auto object-cover rounded" />
                </div>
            )}
            
            {/* Map Preview */}
            {path[path.length-1].includes('map_url') && (
                <div className="mt-2 text-xs text-blue-600">
                    <a href={data} target="_blank" rel="noreferrer" className="flex items-center hover:underline">
                       Voir le lien de la carte <ImageIcon className="w-3 h-3 ml-1"/>
                    </a>
                </div>
            )}
          </div>
        </div>
      );
    } else if (Array.isArray(data)) {
        // --- ARRAY HANDLING ---
        const isEmpty = data.length === 0;
        const isStringArray = !isEmpty && typeof data[0] === 'string';
        const isObjectArray = !isEmpty && typeof data[0] === 'object';
        const arrayLabel = path[path.length-1];

        return (
            <div className="mb-6 border-l-2 border-slate-200 pl-4" key={path.join('.')}>
               <h4 className="font-semibold text-slate-700 mb-3 capitalize flex items-center justify-between">
                  <span>{arrayLabel} <span className="text-xs text-slate-400 font-normal">({data.length} éléments)</span></span>
                  <button 
                     type="button"
                     onClick={() => {
                         let newItem;
                         if (isStringArray) newItem = "Nouvel élément";
                         else if (isObjectArray) newItem = JSON.parse(JSON.stringify(data[0])); // Clone structure
                         else newItem = ""; 
                         
                         const newArr = [...data, newItem];
                         updateField(path, newArr);
                     }}
                     className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded flex items-center"
                   >
                     <Plus className="w-3 h-3 mr-1" /> Ajouter
                   </button>
               </h4>

               <div className="space-y-4">
                    {data.map((item: any, idx: number) => (
                        <div key={idx} className="relative group">
                            {/* Delete Button for Item */}
                            <button 
                                type="button"
                                onClick={() => {
                                    if(window.confirm('Supprimer cet élément ?')) {
                                        const newArr = data.filter((_, i) => i !== idx);
                                        updateField(path, newArr);
                                    }
                                }}
                                className="absolute right-0 top-0 text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                title="Supprimer"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Item Content */}
                            {typeof item === 'string' ? (
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const newArr = [...data];
                                        newArr[idx] = e.target.value;
                                        updateField(path, newArr);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm pr-8"
                                />
                            ) : (
                                <div className="bg-slate-50 p-4 rounded border border-gray-200">
                                    <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Élément {idx + 1}</h5>
                                    {/* Recursive call for object fields inside array */}
                                    {Object.keys(item).map((key) => renderFields(item[key], [...path, String(idx), key]))}
                                </div>
                            )}
                        </div>
                    ))}
               </div>
               
               {isEmpty && (
                  <p className="text-sm text-slate-400 italic">Liste vide. Cliquez sur Ajouter.</p>
               )}
            </div>
        );
    } else if (typeof data === 'object' && data !== null) {
      return (
        <div className="mb-8" key={path.join('.')}>
          {path.length > 2 && ( // Only show sub-headers for deeper levels
             <h3 className="text-md font-medium text-slate-800 mb-3 border-b border-gray-100 pb-1 capitalize mt-4">
               {path[path.length - 1].replace(/_/g, ' ')}
             </h3>
          )}
          <div className="pl-2">
            {Object.keys(data).map((key) => renderFields(data[key], [...path, key]))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <div className="flex items-center">
             <span className="text-xl font-bold text-slate-900 mr-4">Admin Dr Dewispelaere</span>
             <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
               En ligne
             </span>
           </div>
           
           <div className="flex items-center space-x-4">
             <span className="text-sm text-slate-500 hidden sm:inline">{session.user.email}</span>
             <button 
               onClick={handleLogout}
               className="text-slate-500 hover:text-red-600 transition-colors"
               title="Déconnexion"
             >
               <LogOut className="w-5 h-5" />
             </button>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button 
              onClick={() => setActiveTab('fr')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'fr' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-gray-50'}`}
            >
              Français
            </button>
            <button 
              onClick={() => setActiveTab('en')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'en' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-gray-50'}`}
            >
              English
            </button>
          </div>

          <div className="flex items-center space-x-3">
             {saveStatus === 'success' && <span className="text-green-600 text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Sauvegardé</span>}
             {saveStatus === 'error' && <span className="text-red-600 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> Erreur</span>}
             
             <button 
               onClick={() => {
                   if(window.confirm('Annuler les modifications non sauvegardées ?')) {
                       setEditData(JSON.parse(JSON.stringify(content)));
                   }
               }}
               className="px-4 py-2 border border-gray-300 text-slate-700 rounded-md hover:bg-gray-50 flex items-center text-sm"
             >
               <RefreshCw className="w-4 h-4 mr-2" /> Annuler
             </button>
             <button 
               onClick={handleSave}
               disabled={saveStatus === 'saving'}
               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center shadow-sm disabled:opacity-50"
             >
               <Save className="w-4 h-4 mr-2" /> 
               {saveStatus === 'saving' ? 'Enregistrement...' : 'Sauvegarder les modifications'}
             </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar Navigation (Sections) */}
           <div className="hidden lg:block col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sections</h3>
                <nav className="space-y-1">
                  {editData && editData[activeTab] && Object.keys(editData[activeTab]).map(key => (
                    <button 
                      key={key} 
                      onClick={(e) => scrollToSection(e, key)}
                      className="block w-full text-left px-3 py-2 text-sm text-slate-600 rounded hover:bg-gray-50 hover:text-slate-900 capitalize focus:outline-none"
                    >
                      {key}
                    </button>
                  ))}
                </nav>
              </div>
           </div>

           {/* Forms */}
           <div className="col-span-1 lg:col-span-3 space-y-8">
              {editData && editData[activeTab] ? (
                 Object.keys(editData[activeTab]).map(sectionKey => (
                    <div id={`section-${sectionKey}`} key={sectionKey} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                       <h2 className="text-2xl font-light text-slate-900 mb-6 capitalize border-b pb-2">
                         {sectionKey}
                       </h2>
                       {/* Render specific fields for this section */}
                       {renderFields(editData[activeTab][sectionKey as keyof SiteContent], [activeTab, sectionKey])}
                    </div>
                 ))
              ) : (
                <div className="text-center py-12">Chargement du contenu...</div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;