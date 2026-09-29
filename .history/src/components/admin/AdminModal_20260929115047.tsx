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
  Trash2
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { type Lang } from '../../translations';
import { type SiteContent } from '../../types/cms';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data, updateData, resetToDefault } = useContent();
  const [activeTab, setActiveTab] = useState<'seo' | 'services' | 'reviews' | 'slots' | 'faq'>('seo');
  const [editLang, setEditLang] = useState<Lang>('es');
  const [formData, setFormData] = useState<SiteContent>(data);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    updateData(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(formData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `lash_atelier_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121110] border border-gold-500/30 rounded-[20px] shadow-[0_25px_80px_rgba(0,0,0,0.98)] text-cream-50 flex flex-col max-h-[92vh] overflow-hidden my-auto">
        
        {/* ХЕДЕР АДМИНКИ */}
        <div className="p-5 md:px-8 border-b border-white/10 flex items-center justify-between shrink-0 bg-obsidian-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-400 flex items-center justify-center text-gold-400 font-serif font-bold text-sm">
              LA
            </div>
            <div>
              <h2 className="font-serif text-lg md:text-xl text-cream-100 font-normal">Panel de Administración & SEO</h2>
              <span className="text-[10px] text-cream-200/40 uppercase tracking-widest font-mono">Lash Atelier Madrid CMS</span>
            </div>
          </div>

          {/* Переключатель языка редактирования */}
          <div className="flex items-center gap-4">
            <div className="flex bg-obsidian-850 border border-white/10 rounded-full p-1 text-xs">
              <button
                onClick={() => setEditLang('es')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${editLang === 'es' ? 'bg-gold-500 text-obsidian-950 shadow' : 'text-cream-200/50'}`}
              >
                Editar Español
              </button>
              <button
                onClick={() => setEditLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${editLang === 'en' ? 'bg-gold-500 text-obsidian-950 shadow' : 'text-cream-200/50'}`}
              >
                Edit English
              </button>
            </div>

            <button onClick={onClose} className="w-8 h-8 rounded-full bg-obsidian-850 hover:bg-white/10 flex items-center justify-center text-cream-200 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* НАВИГАЦИЯ ПО РАЗДЕЛАМ */}
        <div className="flex border-b border-white/10 px-6 gap-2 shrink-0 bg-obsidian-950 overflow-x-auto text-xs">
          {[
            { id: 'seo', name: 'SEO & Google Spain', icon: Search },
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
                className={`py-3.5 px-4 font-medium flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-gold-400 text-gold-300'
                    : 'border-transparent text-cream-200/50 hover:text-cream-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* ТЕЛО ВКЛАДОК */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* ВКЛАДКА 1: SEO МОДУЛЬ */}
          {activeTab === 'seo' && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300 flex items-center justify-between">
                <span>Modo de indexación: Googlebot activado · Schema.org LocalBusiness (Barrio de Salamanca)</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono text-[10px]">200 OK</span>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                  Meta Title ({editLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.seo[editLang].title}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: {
                      ...formData.seo,
                      [editLang]: { ...formData.seo[editLang], title: e.target.value }
                    }
                  })}
                  className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 focus:border-gold-400 focus:outline-none"
                />
                <span className="text-[10px] text-cream-200/40 mt-1 block">Recomendado: 50-60 caracteres. Actual: {formData.seo[editLang].title.length}</span>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                  Meta Description ({editLang.toUpperCase()})
                </label>
                <textarea
                  rows={3}
                  value={formData.seo[editLang].description}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: {
                      ...formData.seo,
                      [editLang]: { ...formData.seo[editLang], description: e.target.value }
                    }
                  })}
                  className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 focus:border-gold-400 focus:outline-none"
                />
                <span className="text-[10px] text-cream-200/40 mt-1 block">Recomendado: 140-160 caracteres. Actual: {formData.seo[editLang].description.length}</span>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                  Keywords ({editLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.seo[editLang].keywords}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: {
                      ...formData.seo,
                      [editLang]: { ...formData.seo[editLang], keywords: e.target.value }
                    }
                  })}
                  className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">URL Canónica</label>
                  <input
                    type="url"
                    value={formData.seo[editLang].canonicalUrl}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: {
                        ...formData.seo,
                        [editLang]: { ...formData.seo[editLang], canonicalUrl: e.target.value }
                      }
                    })}
                    className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gold-400 font-semibold mb-1">Enlace Google Maps</label>
                  <input
                    type="url"
                    value={formData.seo[editLang].googleMapsUrl}
                    onChange={(e) => setFormData({
                      ...formData,
                      seo: {
                        ...formData.seo,
                        [editLang]: { ...formData.seo[editLang], googleMapsUrl: e.target.value }
                      }
                    })}
                    className="w-full p-3 rounded-xl bg-obsidian-850 border border-white/10 text-sm text-cream-100 focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ВКЛАДКА 2: УСЛУГИ И ЦЕНЫ */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {formData.services[editLang].map((service, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-obsidian-850 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">0{idx + 1} Tratamiento</span>
                  </div>

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

          {/* ВКЛАДКА 3: ДИСПОНИБИЛЬНОСТЬ И СЛОТЫ */}
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
                      <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Ubicación (Salamanca)</label>
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
                    <label className="block text-[10px] text-cream-200/50 uppercase mb-1">Cita del Testimonio</label>
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

        {/* ФУТЕР АДМИНКИ С КНОПКАМИ ДЕЙСТВИЙ */}
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
              Restablecer
            </button>
          </div>

          <div className="flex items-center gap-3">
            {savedToast && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium animate-pulse">
                <Check className="w-4 h-4" /> ¡Guardado con éxito!
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