import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Tag, 
  Star, 
  Calendar, 
  Save, 
  Download, 
  RotateCcw, 
  Check, 
  Globe, 
  HelpCircle,
  Plus,
  Trash2,
  Share2,
  MapPin,
  Code,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { type Lang } from '../../translations';
import { type SiteContent, type CustomMetaTag } from '../../types/cms';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data, updateData, resetToDefault } = useContent();
  const [activeTab, setActiveTab] = useState<'seo' | 'services' | 'reviews' | 'slots' | 'faq'>('seo');
  const [seoSubTab, setSeoSubTab] = useState<'general' | 'social' | 'geo' | 'custom' | 'code'>('general');
  const [editLang, setEditLang] = useState<Lang>('es');
  const [formData, setFormData] = useState<SiteContent>(data);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const currentSeo = formData.seo[editLang] || formData.seo.es;

  const updateCurrentSeo = (patch: Partial<typeof currentSeo>) => {
    setFormData({
      ...formData,
      seo: {
        ...formData.seo,
        [editLang]: {
          ...currentSeo,
          ...patch,
        },
      },
    });
  };

  const handleSave = () => {
    updateData(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(formData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `lash_atelier_seo_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Добавление произвольного meta-тега сеошником
  const handleAddCustomMeta = () => {
    const newTag: CustomMetaTag = {
      id: Date.now().toString(),
      type: 'name',
      key: '',
      value: '',
    };
    const list = currentSeo.customMetaTags || [];
    updateCurrentSeo({ customMetaTags: [...list, newTag] });
  };

  const handleRemoveCustomMeta = (id: string) => {
    const list = currentSeo.customMetaTags || [];
    updateCurrentSeo({ customMetaTags: list.filter((t) => t.id !== id) });
  };

  const handleUpdateCustomMeta = (id: string, patch: Partial<CustomMetaTag>) => {
    const list = currentSeo.customMetaTags || [];
    updateCurrentSeo({
      customMetaTags: list.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#121110] border border-gold-500/30 rounded-[20px] shadow-[0_25px_80px_rgba(0,0,0,0.98)] text-cream-50 flex flex-col max-h-[92vh] overflow-hidden my-auto">
        
        {/* ХЕДЕР АДМИНКИ */}
        <div className="p-5 md:px-8 border-b border-white/10 flex items-center justify-between shrink-0 bg-obsidian-900/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-400 flex items-center justify-center text-gold-400 font-serif font-bold text-sm">
              SEO
            </div>
            <div>
              <h2 className="font-serif text-lg md:text-xl text-cream-100 font-normal">Suite Profesional de Gestión & SEO</h2>
              <span className="text-[10px] text-cream-200/40 uppercase tracking-widest font-mono">Control Total de Meta-Tags · Schema.org · Local SEO</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-obsidian-850 border border-white/10 rounded-full p-1 text-xs">
              <button
                onClick={() => setEditLang('es')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${editLang === 'es' ? 'bg-gold-500 text-obsidian-950 shadow' : 'text-cream-200/50'}`}
              >
                Español (ES)
              </button>
              <button
                onClick={() => setEditLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${editLang === 'en' ? 'bg-gold-500 text-obsidian-950 shadow' : 'text-cream-200/50'}`}
              >
                English (EN)
              </button>
            </div>

            <button onClick={onClose} className="w-8 h-8 rounded-full bg-obsidian-850 hover:bg-white/10 flex items-center justify-center text-cream-200 transition cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ОСНОВНЫЕ ВКЛАДКИ */}
        <div className="flex border-b border-white/10 px-6 gap-2 shrink-0 bg-obsidian-950 overflow-x-auto text-xs">
          {[
            { id: 'seo', name: 'SEO & Meta-Engine', icon: Search },
            { id: 'services', name: 'Tratamientos & Precios', icon: Tag },
            { id: 'slots', name: 'Disponibilidad & Fianza', icon: Calendar },
            { id: 'reviews', name: 'Social Proof / Reseñas', icon: Star },
            { id: 'faq', name: 'FAQ Acordeón', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 font-medium flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-gold-400 text-gold-300 bg-white/[0.02]'
                    : 'border-transparent text-cream-200/50 hover:text-cream-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* ТЕЛО МОДАЛКИ */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* ВКЛАДКА 1: ПОЛНОЦЕННЫЙ SEO-МОДУЛЬ */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              
              {/* ПОДВКЛАДКИ SEO */}
              <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
                {[
                  { id: 'general', label: '1. Indexación & Meta', icon: Bot },
                  { id: 'geo', label: '2. Local SEO Madrid (Geo)', icon: MapPin },
                  { id: 'social', label: '3. OpenGraph & Twitter Cards', icon: Share2 },
                  { id: 'custom', label: '4. Constructor de Meta-Tags (+)', icon: Plus },
                  { id: 'code', label: '5. Inyección Código (GTM/Pixel)', icon: Code },
                ].map((st) => {
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSeoSubTab(st.id as any)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                        seoSubTab === st.id
                          ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                          : 'bg-obsidian-850 text-cream-200/60 hover:text-cream-100 border border-white/5'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{st.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* ПОДРАЗДЕЛ 1: ИНДЕКСАЦИЯ И БАЗОВЫЕ МЕТА */}
              {seoSubTab === 'general' && (
                <div className="space-y-4 max-w-4xl">
                  {/* Google Snippet Live Preview */}
                  <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10 space-y-1">
                    <span className="text-[10px] text-cream-200/40 uppercase tracking-widest font-mono block">Vista Previa Google España:</span>
                    <div className="text-xs text-[#8ab4f8] underline truncate">{currentSeo.canonicalUrl}</div>
                    <div className="text-sm font-medium text-[#c58af9] line-clamp-1">{currentSeo.title}</div>
                    <div className="text-xs text-cream-200/70 line-clamp-2">{currentSeo.description}</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold">Meta Title ({editLang.toUpperCase()})</label>
                      <span className={`text-[10px] ${currentSeo.title.length > 65 ? 'text-red-400' : 'text-emerald-400'}`}>{currentSeo.title.length} / 65 caracteres</span>
                    </div>
                    <input
                      type="text"
                      value={currentSeo.title}
                      onChange={(e) => updateCurrentSeo({ title: e.target.value })}
                      className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold">Meta Description ({editLang.toUpperCase()})</label>
                      <span className={`text-[10px] ${currentSeo.description.length > 160 ? 'text-red-400' : 'text-emerald-400'}`}>{currentSeo.description.length} / 160 caracteres</span>
                    </div>
                    <textarea
                      rows={3}
                      value={currentSeo.description}
                      onChange={(e) => updateCurrentSeo({ description: e.target.value })}
                      className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">Meta Keywords (separadas por coma)</label>
                    <input
                      type="text"
                      value={currentSeo.keywords}
                      onChange={(e) => updateCurrentSeo({ keywords: e.target.value })}
                      className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">Autor / Firma</label>
                      <input
                        type="text"
                        value={currentSeo.author}
                        onChange={(e) => updateCurrentSeo({ author: e.target.value })}
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">URL Canónica Principal</label>
                      <input
                        type="url"
                        value={currentSeo.canonicalUrl}
                        onChange={(e) => updateCurrentSeo({ canonicalUrl: e.target.value })}
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100"
                      />
                    </div>
                  </div>

                  {/* Настройки Robots (Индексация) */}
                  <div className="p-4 rounded-xl bg-obsidian-850 border border-white/10 space-y-3">
                    <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5" /> Directivas para Googlebot (Robots)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentSeo.robotsIndex}
                          onChange={(e) => updateCurrentSeo({ robotsIndex: e.target.checked })}
                          className="rounded text-gold-500"
                        />
                        <span>Index (Permitir)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentSeo.robotsFollow}
                          onChange={(e) => updateCurrentSeo({ robotsFollow: e.target.checked })}
                          className="rounded text-gold-500"
                        />
                        <span>Follow (Seguir links)</span>
                      </label>
                      <div>
                        <span className="block text-[10px] text-cream-200/50 mb-0.5">max-image-preview</span>
                        <select
                          value={currentSeo.maxImagePreview}
                          onChange={(e) => updateCurrentSeo({ maxImagePreview: e.target.value as any })}
                          className="w-full p-1.5 rounded bg-obsidian-900 border border-white/10 text-xs text-cream-100"
                        >
                          <option value="large">large (Recomendado)</option>
                          <option value="standard">standard</option>
                          <option value="none">none</option>
                        </select>
                      </div>
                      <div>
                        <span className="block text-[10px] text-cream-200/50 mb-0.5">max-snippet</span>
                        <input
                          type="number"
                          value={currentSeo.maxSnippet}
                          onChange={(e) => updateCurrentSeo({ maxSnippet: parseInt(e.target.value) || -1 })}
                          className="w-full p-1.5 rounded bg-obsidian-900 border border-white/10 text-xs text-cream-100 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ПОДРАЗДЕЛ 2: ЛОКАЛЬНОЕ SEO (MADRID GEO TAGS) */}
              {seoSubTab === 'geo' && (
                <div className="space-y-4 max-w-3xl">
                  <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300">
                    Los meta-tags geográficos le indican a Google, Apple Maps y Bing la ubicación física exacta de tu estudio en Madrid, aumentando un 60% la visibilidad en búsquedas locales como <em>«extensiones de pestañas cerca de mí»</em>.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">geo.region (Comunidad Autónoma)</label>
                      <input
                        type="text"
                        value={currentSeo.geoRegion}
                        onChange={(e) => updateCurrentSeo({ geoRegion: e.target.value })}
                        placeholder="ES-M"
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">geo.placename (Localidad / Barrio)</label>
                      <input
                        type="text"
                        value={currentSeo.geoPlacename}
                        onChange={(e) => updateCurrentSeo({ geoPlacename: e.target.value })}
                        placeholder="Madrid (Barrio de Salamanca)"
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">geo.position (Latitud; Longitud)</label>
                      <input
                        type="text"
                        value={currentSeo.geoPosition}
                        onChange={(e) => updateCurrentSeo({ geoPosition: e.target.value })}
                        placeholder="40.4285;-3.6841"
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">ICBM (Coordenadas estándar)</label>
                      <input
                        type="text"
                        value={currentSeo.icbm}
                        onChange={(e) => updateCurrentSeo({ icbm: e.target.value })}
                        placeholder="40.4285, -3.6841"
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ПОДРАЗДЕЛ 3: OPENGRAPH & TWITTER */}
              {seoSubTab === 'social' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">og:title (WhatsApp / RRSS)</label>
                      <input
                        type="text"
                        value={currentSeo.ogTitle}
                        onChange={(e) => updateCurrentSeo({ ogTitle: e.target.value })}
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">og:site_name</label>
                      <input
                        type="text"
                        value={currentSeo.ogSiteName}
                        onChange={(e) => updateCurrentSeo({ ogSiteName: e.target.value })}
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">og:description</label>
                    <textarea
                      rows={2}
                      value={currentSeo.ogDescription}
                      onChange={(e) => updateCurrentSeo({ ogDescription: e.target.value })}
                      className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">og:image (URL imagen compartida)</label>
                      <input
                        type="text"
                        value={currentSeo.ogImage}
                        onChange={(e) => updateCurrentSeo({ ogImage: e.target.value })}
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">og:locale</label>
                      <input
                        type="text"
                        value={currentSeo.ogLocale}
                        onChange={(e) => updateCurrentSeo({ ogLocale: e.target.value })}
                        className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-obsidian-850 border border-white/10 space-y-3">
                    <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Twitter Card Specs</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-cream-200/50 mb-1">twitter:card</label>
                        <select
                          value={currentSeo.twitterCard}
                          onChange={(e) => updateCurrentSeo({ twitterCard: e.target.value as any })}
                          className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-cream-100"
                        >
                          <option value="summary_large_image">summary_large_image (Recomendado)</option>
                          <option value="summary">summary</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-cream-200/50 mb-1">twitter:site</label>
                        <input
                          type="text"
                          value={currentSeo.twitterSite}
                          onChange={(e) => updateCurrentSeo({ twitterSite: e.target.value })}
                          placeholder="@lashateliermadrid"
                          className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-cream-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ПОДРАЗДЕЛ 4: КОНСТРУКТОР ПРОИЗВОЛЬНЫХ META-ТЕГОВ ДЛЯ СЕОШНИКА */}
              {seoSubTab === 'custom' && (
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-serif text-cream-100 font-normal">Meta-Tags Personalizados (Inyección Directa en HTML)</h4>
                      <p className="text-xs text-cream-200/50">Añade cualquier meta-tag arbitrario sin necesidad de tocar el código de la web.</p>
                    </div>
                    <button
                      onClick={handleAddCustomMeta}
                      className="px-3.5 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir Meta-Tag</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(!currentSeo.customMetaTags || currentSeo.customMetaTags.length === 0) ? (
                      <div className="p-6 text-center text-xs text-cream-200/40 border border-dashed border-white/10 rounded-xl">
                        No hay meta-tags personalizados. Haz clic en "Añadir Meta-Tag" para insertar uno.
                      </div>
                    ) : (
                      currentSeo.customMetaTags.map((tag) => (
                        <div key={tag.id} className="p-3 rounded-xl bg-obsidian-850 border border-white/10 flex flex-wrap items-center gap-3">
                          <select
                            value={tag.type}
                            onChange={(e) => handleUpdateCustomMeta(tag.id, { type: e.target.value as any })}
                            className="p-2 rounded bg-obsidian-900 border border-white/10 text-xs text-gold-300 font-mono"
                          >
                            <option value="name">name="..."</option>
                            <option value="property">property="..."</option>
                            <option value="http-equiv">http-equiv="..."</option>
                          </select>

                          <input
                            type="text"
                            placeholder="Clave (ej. theme-color, pinterest-rich-pin)"
                            value={tag.key}
                            onChange={(e) => handleUpdateCustomMeta(tag.id, { key: e.target.value })}
                            className="flex-1 min-w-[180px] p-2 rounded bg-obsidian-900 border border-white/10 text-xs text-cream-100 font-mono"
                          />

                          <input
                            type="text"
                            placeholder="Valor content='...'"
                            value={tag.value}
                            onChange={(e) => handleUpdateCustomMeta(tag.id, { value: e.target.value })}
                            className="flex-1 min-w-[200px] p-2 rounded bg-obsidian-900 border border-white/10 text-xs text-cream-100"
                          />

                          <button
                            onClick={() => handleRemoveCustomMeta(tag.id)}
                            className="p-2 text-red-400/60 hover:text-red-400 transition cursor-pointer"
                            title="Eliminar este tag"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* ПОДРАЗДЕЛ 5: ВСТАВКА СТОРОННЕГО КОДА И ПИКСЕЛЕЙ */}
              {seoSubTab === 'code' && (
                <div className="space-y-4 max-w-4xl">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                      Código de Verificación Google Search Console
                    </label>
                    <input
                      type="text"
                      placeholder="google-site-verification=XXXXXXXXXXXXXXXXXXXXX"
                      value={currentSeo.googleSiteVerification}
                      onChange={(e) => updateCurrentSeo({ googleSiteVerification: e.target.value })}
                      className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-xs font-mono text-cream-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                      Inyección de Código Personalizado en &lt;head&gt; (GTM, Scripts de Tracking)
                    </label>
                    <textarea
                      rows={6}
                      placeholder="<!-- Pega aquí Google Tag Manager, Meta Pixel o cualquier script HTML -->"
                      value={currentSeo.customHeadCode}
                      onChange={(e) => updateCurrentSeo({ customHeadCode: e.target.value })}
                      className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-xs font-mono text-cream-100 leading-relaxed"
                    />
                    <span className="text-[10px] text-cream-200/40 mt-1 block">Este código se inyecta directamente en el &lt;head&gt; del HTML en tiempo real.</span>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ВКЛАДКА 2: УСЛУГИ */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {formData.services[editLang].map((service, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-obsidian-850 border border-white/10 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">0{idx + 1} Tratamiento</span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Nombre</label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => {
                          const updated = [...formData.services[editLang]];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, services: { ...formData.services, [editLang]: updated } });
                        }}
                        className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-sm text-cream-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Tag Alta Costura</label>
                      <input
                        type="text"
                        value={service.tag}
                        onChange={(e) => {
                          const updated = [...formData.services[editLang]];
                          updated[idx].tag = e.target.value;
                          setFormData({ ...formData, services: { ...formData.services, [editLang]: updated } });
                        }}
                        className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-sm text-gold-300 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Precio</label>
                      <input
                        type="text"
                        value={service.price}
                        onChange={(e) => {
                          const updated = [...formData.services[editLang]];
                          updated[idx].price = e.target.value;
                          setFormData({ ...formData, services: { ...formData.services, [editLang]: updated } });
                        }}
                        className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-sm text-cream-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Duración</label>
                      <input
                        type="text"
                        value={service.time}
                        onChange={(e) => {
                          const updated = [...formData.services[editLang]];
                          updated[idx].time = e.target.value;
                          setFormData({ ...formData, services: { ...formData.services, [editLang]: updated } });
                        }}
                        className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-sm text-cream-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Descripción</label>
                    <textarea
                      rows={2}
                      value={service.desc}
                      onChange={(e) => {
                        const updated = [...formData.services[editLang]];
                        updated[idx].desc = e.target.value;
                        setFormData({ ...formData, services: { ...formData.services, [editLang]: updated } });
                      }}
                      className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-cream-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ВКЛАДКА 3: ДИСПОНИБИЛЬНОСТЬ */}
          {activeTab === 'slots' && (
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                  Texto del Badge en Hero ({editLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.spotsLeft[editLang]}
                  onChange={(e) => setFormData({
                    ...formData,
                    spotsLeft: { ...formData.spotsLeft, [editLang]: e.target.value }
                  })}
                  className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                  Importe de la Fianza (Bizum / Tarjeta)
                </label>
                <input
                  type="text"
                  value={formData.depositAmount}
                  onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                  className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100"
                />
              </div>
            </div>
          )}

          {/* ВКЛАДКА 4: ОТЗЫВЫ */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {formData.reviews[editLang].map((review, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-obsidian-850 border border-white/10 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Autora</label>
                      <input
                        type="text"
                        value={review.author}
                        onChange={(e) => {
                          const updated = [...formData.reviews[editLang]];
                          updated[idx].author = e.target.value;
                          setFormData({ ...formData, reviews: { ...formData.reviews, [editLang]: updated } });
                        }}
                        className="w-full p-2 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-cream-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Ubicación</label>
                      <input
                        type="text"
                        value={review.location}
                        onChange={(e) => {
                          const updated = [...formData.reviews[editLang]];
                          updated[idx].location = e.target.value;
                          setFormData({ ...formData, reviews: { ...formData.reviews, [editLang]: updated } });
                        }}
                        className="w-full p-2 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-cream-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Cita</label>
                    <textarea
                      rows={2}
                      value={review.quote}
                      onChange={(e) => {
                        const updated = [...formData.reviews[editLang]];
                        updated[idx].quote = e.target.value;
                        setFormData({ ...formData, reviews: { ...formData.reviews, [editLang]: updated } });
                      }}
                      className="w-full p-2 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-cream-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ВКЛАДКА 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {formData.faq[editLang].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-obsidian-850 border border-white/10 space-y-3">
                  <div>
                    <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Pregunta ({idx + 1})</label>
                    <input
                      type="text"
                      value={item.q}
                      onChange={(e) => {
                        const updated = [...formData.faq[editLang]];
                        updated[idx].q = e.target.value;
                        setFormData({ ...formData, faq: { ...formData.faq, [editLang]: updated } });
                      }}
                      className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-sm text-cream-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Respuesta</label>
                    <textarea
                      rows={2}
                      value={item.a}
                      onChange={(e) => {
                        const updated = [...formData.faq[editLang]];
                        updated[idx].a = e.target.value;
                        setFormData({ ...formData, faq: { ...formData.faq, [editLang]: updated } });
                      }}
                      className="w-full p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-cream-100 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ФУТЕР АДМИНКИ */}
        <div className="p-4 md:px-8 border-t border-white/10 bg-obsidian-900/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="px-4 py-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-xs text-cream-200/80 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Backup JSON</span>
            </button>
            <button
              onClick={resetToDefault}
              className="px-3 py-2 rounded-xl text-xs text-red-400/60 hover:text-red-300 transition cursor-pointer"
            >
              Restablecer Valores
            </button>
          </div>

          <div className="flex items-center gap-3">
            {savedToast && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium animate-pulse">
                <Check className="w-4 h-4" /> ¡Guardado y Meta-Tags Actualizados!
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg transition cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};