

import React from 'react';
import { DishResult, Language } from '../types';
import { X, Calendar } from 'lucide-react';
import { t } from '../translations';

interface RecipeBookProps {
  isOpen: boolean;
  onClose: () => void;
  history: DishResult[];
  onSelectDish: (dish: DishResult) => void;
  language: Language;
}

export const RecipeBook: React.FC<RecipeBookProps> = ({ isOpen, onClose, history, onSelectDish, language }) => {
  if (!isOpen) return null;
  
  const getStatusLabel = (status: string, lang: Language) => {
      if (lang !== 'zh') return status.toUpperCase();
      const map: Record<string, string> = {
          'chopped': '切碎',
          'blended': '搅拌',
          'dried': '风干',
          'marinated': '腌制',
          'raw': '生'
      };
      return map[status] || status;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[85vh] relative z-10 overflow-hidden flex flex-col animate-slide-up border-4 border-stone-100">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                    <span className="text-2xl">📖</span>
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-stone-800 leading-none">{t('myCookbook', language)}</h2>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
                        {history.length} {t('recorded', language)}
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
            {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 text-center">
                    <div className="text-6xl mb-6 opacity-30 animate-float">🍳</div>
                    <p className="font-display font-bold text-xl text-stone-500">{t('cookbookEmpty', language)}</p>
                    <p className="text-sm mt-2 max-w-xs mx-auto">{t('startCookingMsg', language)}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {history.map((dish, index) => (
                        <button 
                            key={index}
                            onClick={() => {
                                onSelectDish(dish);
                                onClose();
                            }}
                            className="bg-white p-3 rounded-2xl border-2 border-stone-100 shadow-sm hover:shadow-lg hover:border-chef-300 transition-all flex items-start gap-4 text-left group hover:-translate-y-1"
                        >
                            {/* Image/Emoji */}
                            <div className="w-20 h-20 rounded-xl bg-stone-100 flex-shrink-0 overflow-hidden relative border border-stone-100 shadow-inner group-hover:shadow-md transition-all">
                                {dish.imageUrl ? (
                                    <img src={dish.imageUrl} alt={dish.dishName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                                        {dish.emoji}
                                    </div>
                                )}
                                {/* Score Badge */}
                                <div className={`absolute top-1 right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm border border-white/50 backdrop-blur-sm z-10
                                    ${dish.score >= 80 ? 'bg-green-500 text-white' : dish.score <= 30 ? 'bg-red-500 text-white' : 'bg-white/90 text-stone-600'}
                                `}>
                                    {dish.score}
                                </div>
                            </div>
                            
                            <div className="flex-1 min-w-0 py-1">
                                <h3 className="font-display font-bold text-stone-800 truncate leading-tight mb-1 group-hover:text-chef-600 transition-colors text-lg">
                                    {dish.dishName}
                                </h3>
                                
                                {dish.customerName ? (
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-sm">{dish.customerEmoji}</span>
                                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wide truncate">{dish.customerName}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wide bg-stone-100 px-2 py-0.5 rounded-full">{t('sandboxMode', language)}</span>
                                    </div>
                                )}
                                
                                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                                    {dish.description}
                                </p>

                                {/* Ingredients List */}
                                {dish.ingredients && dish.ingredients.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-stone-100 flex flex-wrap gap-1">
                                        {dish.ingredients.map((ing, idx) => (
                                            <span 
                                                key={idx} 
                                                className="text-[10px] px-1.5 py-0.5 bg-stone-50 rounded text-stone-500 border border-stone-100 flex items-center gap-1" 
                                                title={`${ing.name} ${ing.marinade ? `(Marinated: ${ing.marinade})` : ''}`}
                                            >
                                                <span>{ing.emoji}</span>
                                                <span className="truncate max-w-[120px] hidden sm:inline flex items-center gap-1">
                                                     {ing.status && <span className="bg-stone-200 px-1 rounded-[2px] text-[8px] uppercase tracking-wider text-stone-600 font-bold">{getStatusLabel(ing.status, language)}</span>}
                                                     {ing.name}
                                                     {ing.marinade && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full ml-0.5" title="Marinated"></span>}
                                                </span>
                                                {/* Mobile minimal view */}
                                                <span className="sm:hidden">
                                                    {ing.status && <span className="text-[8px] bg-stone-200 rounded px-0.5 mr-0.5 font-bold">{getStatusLabel(ing.status, language).charAt(0)}</span>}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};