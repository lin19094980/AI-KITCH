

import React from 'react';
import { DishResult, Customer, Language } from '../types';
import { X, RotateCcw, BookOpenCheck, DollarSign } from 'lucide-react';
import { t } from '../translations';

interface ResultModalProps {
  result: DishResult | null;
  onClose: () => void;
  onReset: () => void;
  customer: Customer | null;
  isHistoryView?: boolean;
  language: Language;
}

export const ResultModal: React.FC<ResultModalProps> = ({ result, onClose, onReset, customer, isHistoryView = false, language }) => {
  if (!result) return null;

  const isHighScoring = result.score >= 80;
  const isLowScoring = result.score <= 30;
  const isSatisfied = result.customerSatisfied;

  // Determine which customer data to show (History snapshot vs Current)
  const displayCustomerName = result.customerName || (language === 'zh' ? customer?.nameZh || customer?.name : customer?.name);
  const displayCustomerEmoji = result.customerEmoji || customer?.emoji;
  const hasCustomerInfo = !!(result.customerFeedback && displayCustomerName);
  const hasFinancials = result.revenue !== undefined;

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden slide-up flex flex-col max-h-[90vh]">
        
        {/* Header Visual - Image or Emoji */}
        <div 
            className="w-full relative flex items-center justify-center overflow-hidden transition-all duration-500 group"
            style={{ 
                minHeight: result.imageUrl ? '240px' : '160px',
                backgroundColor: result.imageUrl ? '#000' : result.colorHex 
            }}
        >
            {result.imageUrl ? (
                <>
                  <img 
                      src={result.imageUrl} 
                      alt={result.dishName} 
                      className="w-full h-full object-cover absolute inset-0 animate-[fadeIn_0.5s_ease-out]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </>
            ) : (
                <div className="text-8xl drop-shadow-2xl filter transform hover:scale-110 transition-transform cursor-default z-10">
                    {result.emoji}
                </div>
            )}
            
            {/* Close Button */}
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20 backdrop-blur-sm"
            >
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center flex-1 overflow-y-auto -mt-6 relative z-10 bg-white rounded-t-3xl">
            <div className="mb-2">
                {isHighScoring && <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wide border border-green-200">{t('chefsChoice', language)}</span>}
                {isLowScoring && <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full uppercase tracking-wide border border-red-200">{t('kitchenDisaster', language)}</span>}
                {isHistoryView && <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full uppercase tracking-wide border border-stone-200 ml-2">{t('archived', language)}</span>}
            </div>
            
            <h2 className="text-2xl font-display font-bold text-stone-800 mb-1 leading-tight">
                {result.dishName}
            </h2>
            
            <p className="text-stone-500 mb-4 leading-relaxed text-sm">
                {result.description}
            </p>

            {/* Ingredients Display */}
            {result.ingredients && result.ingredients.length > 0 && (
                <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {result.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg border border-stone-100 text-xs text-stone-600 shadow-sm">
                            <span>{ing.emoji}</span>
                            <div className="flex items-center gap-1">
                                {ing.status && <span className="bg-stone-200 px-1 rounded-[2px] text-[8px] uppercase tracking-wider text-stone-500 font-bold">{getStatusLabel(ing.status, language)}</span>}
                                <span className="font-bold">{ing.name}</span>
                                {ing.marinade && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full ml-0.5" title={`Marinated: ${ing.marinade}`}></span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Score Card */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3 flex-1 shadow-sm">
                    <div className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">{t('tasteScore', language)}</div>
                    <div className={`text-4xl font-black ${isHighScoring ? 'text-chef-500' : isLowScoring ? 'text-stone-600' : 'text-stone-700'}`}>
                        {result.score}<span className="text-lg text-stone-300 font-normal ml-1">/100</span>
                    </div>
                </div>
            </div>

            {/* Receipt Section (Challenge Mode) */}
            {hasFinancials && (
                <div className="mb-4 bg-stone-50 border-y-2 border-dashed border-stone-200 p-3 font-mono text-sm relative">
                    <div className="flex justify-between items-center text-stone-500 mb-1">
                        <span>{t('ingredientCost', language)}</span>
                        <span className="text-red-500">-${result.cost}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-500 mb-1">
                        <span>{t('revenue', language)}</span>
                        <span className="text-green-600">+${result.revenue}</span>
                    </div>
                    {/* Late Penalty */}
                    {result.latePenalty && result.latePenalty > 0 && (
                         <div className="flex justify-between items-center text-stone-500 mb-1">
                            <span>{t('latePenalty', language)}</span>
                            <span className="text-red-600">-${result.latePenalty}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center font-bold text-lg border-t border-stone-200 pt-2 mt-2">
                        <span>{t('netProfit', language)}</span>
                        <span className={(result.profit || 0) >= 0 ? "text-stone-800" : "text-red-600"}>
                            {(result.profit || 0) > 0 ? '+' : ''}{result.profit}
                        </span>
                    </div>
                    {/* Visual Stamp */}
                    {(result.profit || 0) > 20 && <div className="absolute -right-2 top-2 rotate-12 text-green-500/20 text-4xl font-black border-4 border-green-500/20 rounded-lg px-2 pointer-events-none">PROFIT</div>}
                </div>
            )}

            {/* Customer Verdict */}
            {hasCustomerInfo && (
              <div className={`rounded-xl p-4 border relative mb-4 text-left ${isSatisfied ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                 <div className="flex items-start gap-3">
                    <div className="text-3xl bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm border border-stone-100 flex-shrink-0">
                        {displayCustomerEmoji}
                    </div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1">
                           <span className="text-stone-500">{displayCustomerName}</span>
                           <span className="text-stone-300">•</span>
                           {isSatisfied ? <span className="text-green-600">{t('satisfied', language)}</span> : <span className="text-red-600">{t('unhappy', language)}</span>}
                        </div>
                        <div className={`text-sm font-medium leading-snug italic ${isSatisfied ? 'text-green-800' : 'text-red-800'}`}>
                            "{result.customerFeedback}"
                        </div>
                    </div>
                 </div>
              </div>
            )}

            {/* Chef Comment */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 relative mt-4">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-0.5 rounded-full border border-amber-100 shadow-sm flex items-center gap-1">
                    <span className="text-xs font-bold text-amber-600">{t('chefSays', language)}</span>
                </div>
                <p className="text-amber-900 italic text-sm mt-1">
                    "{result.chefComment}"
                </p>
            </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-stone-50 border-t border-stone-100">
            {isHistoryView ? (
                <button 
                    onClick={onClose}
                    className="w-full bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                    <BookOpenCheck size={18} />
                    {t('closeEntry', language)}
                </button>
            ) : (
                <button 
                    onClick={onReset}
                    className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-stone-200"
                >
                    <RotateCcw size={18} />
                    {customer ? t('nextCustomer', language) : t('cookSomethingElse', language)}
                </button>
            )}
        </div>

      </div>
    </div>
  );
};