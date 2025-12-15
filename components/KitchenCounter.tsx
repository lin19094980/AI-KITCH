

import React from 'react';
import { KitchenItem, Language, Theme } from '../types';
import { Trash2, Scissors, Zap, Droplets, Wind } from 'lucide-react';
import { t } from '../translations';

interface KitchenCounterProps {
  items: KitchenItem[];
  onItemClick: (item: KitchenItem) => void;
  onItemDelete: (item: KitchenItem) => void;
  activeStationLabel: string;
  language: Language;
  theme: Theme;
}

export const KitchenCounter: React.FC<KitchenCounterProps> = ({ 
  items, 
  onItemClick, 
  onItemDelete,
  activeStationLabel,
  language,
  theme
}) => {
  
  const getStatusBadges = (item: KitchenItem) => {
    return (
        <div className="absolute -top-2 -right-2 flex flex-col gap-0.5 items-end z-20 pointer-events-none">
            {item.status === 'chopped' && (
                <div className="bg-stone-700 text-white p-1 rounded-full shadow-md border border-white"><Scissors size={10} /></div>
            )}
            {item.status === 'blended' && (
                <div className="bg-purple-500 text-white p-1 rounded-full shadow-md border border-white"><Zap size={10} /></div>
            )}
            {item.status === 'dried' && (
                <div className="bg-blue-400 text-white p-1 rounded-full shadow-md border border-white"><Wind size={10} /></div>
            )}
            {(item.status === 'marinated' || (item.marinadeLabels && item.marinadeLabels.length > 0)) && (
                <div className="bg-amber-600 text-white p-1 rounded-full shadow-md border border-white"><Droplets size={10} /></div>
            )}
        </div>
    );
  };

  const getStatusText = (item: KitchenItem) => {
      let text = '';
      
      // If item status is raw, don't show it unless it has marinades
      if (item.status !== 'raw') {
          text = item.status;
      }

      if (item.marinadeLabels && item.marinadeLabels.length > 0) {
          if (item.status === 'marinated') {
              // It's just marinated (raw)
              return 'marinated';
          }
          if (text) text += ' & ';
          text += 'marinated';
      }
      
      return text;
  };
  
  const isJapanese = theme === 'japanese';

  return (
    <div className={`border-t-8 p-2 sm:p-4 absolute bottom-0 left-0 right-0 h-28 sm:h-40 flex flex-col z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transition-all
        ${isJapanese ? 'bg-wood-dark border-jp-800' : 'bg-marble border-stone-300'}
    `}>
      <div className="flex justify-between items-center mb-1 px-1 flex-shrink-0">
        <h3 className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2 drop-shadow-sm
             ${isJapanese ? 'text-stone-200' : 'text-stone-500'}
        `}>
            <span>{t('kitchenCounter', language)}</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] min-w-[20px] text-center border
                 ${isJapanese ? 'bg-jp-800 text-white border-jp-900' : 'bg-stone-200 text-stone-600 border-stone-300'}
            `}>{items.length}</span>
        </h3>
        <span className={`text-[9px] sm:text-xs font-bold animate-pulse truncate ml-2 backdrop-blur-sm px-2 py-0.5 rounded-full border shadow-sm
             ${isJapanese ? 'text-white bg-jp-indigo/80 border-indigo-300' : 'text-chef-700 bg-chef-100/80 border-chef-200'}
        `}>
            {t('tapToAdd', language)} {activeStationLabel}
        </span>
      </div>
      
      <div className="flex gap-2 overflow-x-auto h-full items-start px-1 pb-2 pt-1 sm:pt-2 scrollbar-hide w-full">
        {items.length === 0 && (
            <div className={`w-full h-full flex flex-col items-center justify-center text-xs sm:text-sm font-medium italic opacity-60
                 ${isJapanese ? 'text-white/40' : 'text-stone-400'}
            `}>
                <div className="text-xl sm:text-2xl mb-1">🍽️</div>
                {language === 'zh' ? '台面空空如也' : 'Counter is empty'}
            </div>
        )}

        {items.map((item) => {
          const displayName = language === 'zh' ? item.nameZh || item.name : item.name;
          const marinadeText = item.marinadeLabels && item.marinadeLabels.length > 0 
              ? `${language === 'zh' ? '腌制于: ' : 'Marinated with: '}${item.marinadeLabels.join(', ')}` 
              : '';
          const fullTitle = `${displayName}${marinadeText ? '\n' + marinadeText : ''}`;
          
          const statusText = getStatusText(item);

          return (
            <div key={item.instanceId} className="group flex-shrink-0 w-14 sm:w-20 flex flex-col items-center relative">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 transition-all hover:-translate-y-2">
                
                {/* Shadow underneath item to stick it to counter */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-2 bg-black/20 blur-md rounded-full pointer-events-none group-hover:scale-75 group-hover:opacity-50 transition-all"></div>

                <button
                    onClick={() => onItemClick(item)}
                    title={fullTitle}
                    className={`
                    w-full h-full rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-sm border border-white/40 overflow-visible relative z-10
                    ${item.status !== 'raw' || (item.marinadeLabels && item.marinadeLabels.length > 0) ? 'bg-stone-50/50 backdrop-blur-sm' : ''}
                    `}
                >
                    <span className="drop-shadow-lg filter">{item.emoji}</span>
                    {getStatusBadges(item)}
                    
                    {/* Visual indicator for marinade flavor inside the button */}
                    {item.marinadeLabels && item.marinadeLabels.length > 0 && (
                        <div className="absolute bottom-0 right-0 flex gap-0.5 bg-white/80 rounded-full px-1 py-0.5">
                        {item.marinadeLabels.slice(0, 2).map((_, i) => (
                            <div key={i} className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 border border-white shadow-sm"></div>
                        ))}
                        {item.marinadeLabels.length > 2 && <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-stone-400 border border-white shadow-sm"></div>}
                        </div>
                    )}
                </button>

                <button 
                    onClick={(e) => { e.stopPropagation(); onItemDelete(item); }}
                    className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 bg-white text-red-500 border border-red-100 rounded-full p-1 sm:p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg z-30 transform scale-90 hover:scale-110"
                >
                    <Trash2 size={12} />
                </button>
              </div>
              
              <div className="text-[8px] sm:text-[10px] text-center mt-1 font-bold text-stone-600 w-full px-0.5 leading-tight z-10 drop-shadow-sm bg-white/50 backdrop-blur-sm rounded-md py-0.5">
                  {statusText && <span className="block text-[8px] sm:text-[9px] text-stone-500 font-normal capitalize mb-0.5 leading-none">{statusText}</span>}
                  <div className="line-clamp-2" title={displayName}>{displayName}</div>
              </div>
            </div>
          );
        })}
        {/* Spacer for scrolling */}
        <div className="w-4 flex-shrink-0"></div>
      </div>
    </div>
  );
};