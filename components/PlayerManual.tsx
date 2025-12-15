
import React from 'react';
import { X, Book, Utensils, Droplets, Flame, Martini, Lightbulb, ChefHat, Trophy, Gamepad2 } from 'lucide-react';
import { Language } from '../types';
import { t } from '../translations';

interface PlayerManualProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PlayerManual: React.FC<PlayerManualProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[85vh] relative z-10 overflow-hidden flex flex-col animate-slide-up border-4 border-stone-100">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                    <Book size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-stone-800 leading-none">{t('howToPlay', language)}</h2>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
                        {t('manual', language)}
                    </span>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-50 space-y-6">
            
            {/* Intro */}
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
                 <h3 className="text-lg font-bold text-stone-800 mb-2 flex items-center gap-2">
                    <ChefHat className="text-chef-500" size={20} />
                    {t('welcomeChef', language)}
                 </h3>
                 <p className="text-stone-600 text-sm leading-relaxed">
                    {t('manualIntro', language)}
                 </p>
            </section>

            {/* Game Modes */}
            <section>
                <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Gamepad2 size={14} /> {t('gameModes', language)}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border-l-4 border-blue-400 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                             <Utensils size={16} className="text-blue-500"/>
                             <div className="font-bold text-stone-800">{t('sandboxMode', language)}</div>
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed">{t('sandboxDesc', language)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-l-4 border-orange-400 shadow-sm">
                         <div className="flex items-center gap-2 mb-1">
                             <Trophy size={16} className="text-orange-500"/>
                             <div className="font-bold text-stone-800">{t('challengeMode', language)}</div>
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed">{t('challengeDesc', language)}</p>
                    </div>
                </div>
            </section>

            {/* Stations */}
            <section>
                <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">{t('stations', language)}</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-stone-100">
                        <div className="bg-stone-100 p-2 rounded-lg text-stone-600"><Utensils size={18} /></div>
                        <div>
                            <span className="font-bold text-stone-800 block text-sm">{t('prepStation', language)}</span>
                            <span className="text-xs text-stone-500 leading-tight">{t('prepDesc', language)}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-stone-100">
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><Droplets size={18} /></div>
                        <div>
                            <span className="font-bold text-stone-800 block text-sm">{t('marinateStation', language)}</span>
                            <span className="text-xs text-stone-500 leading-tight">{t('marinateDesc', language)}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-stone-100">
                        <div className="bg-red-100 p-2 rounded-lg text-red-600"><Flame size={18} /></div>
                        <div>
                            <span className="font-bold text-stone-800 block text-sm">{t('cookingStation', language)}</span>
                            <span className="text-xs text-stone-500 leading-tight">{t('cookDesc', language)}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-stone-100">
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Martini size={18} /></div>
                        <div>
                            <span className="font-bold text-stone-800 block text-sm">{t('barStation', language)}</span>
                            <span className="text-xs text-stone-500 leading-tight">{t('barDesc', language)}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tips */}
             <section className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
                 <h3 className="text-sm font-black text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <Lightbulb size={16} /> {t('proTips', language)}
                 </h3>
                 <ul className="grid gap-2">
                    <li className="flex gap-2 text-sm text-amber-900 bg-white/50 p-2 rounded-lg">
                        <span className="text-amber-500 font-bold">•</span>
                        {t('tip1', language)}
                    </li>
                    <li className="flex gap-2 text-sm text-amber-900 bg-white/50 p-2 rounded-lg">
                        <span className="text-amber-500 font-bold">•</span>
                        {t('tip2', language)}
                    </li>
                    <li className="flex gap-2 text-sm text-amber-900 bg-white/50 p-2 rounded-lg">
                        <span className="text-amber-500 font-bold">•</span>
                        {t('tip3', language)}
                    </li>
                    <li className="flex gap-2 text-sm text-amber-900 bg-white/50 p-2 rounded-lg">
                        <span className="text-amber-500 font-bold">•</span>
                        {t('tip4', language)}
                    </li>
                 </ul>
            </section>

        </div>
      </div>
    </div>
  );
};
