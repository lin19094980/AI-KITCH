
import React from 'react';
import { Utensils, Droplets, Martini } from 'lucide-react';
import { Language, Theme } from '../types';
import { t } from '../translations';

interface StationSelectorProps {
  mode: 'PREP' | 'MARINATE' | 'COOK' | 'BAR';
  onSetMode: (mode: 'PREP' | 'MARINATE' | 'COOK' | 'BAR') => void;
  isCooking: boolean;
  language: Language;
  theme: Theme;
}

export const StationSelector: React.FC<StationSelectorProps> = ({
  mode,
  onSetMode,
  isCooking,
  language,
  theme
}) => {
  const isJapanese = theme === 'japanese';
  
  return (
    <div className={`flex-none flex p-1 rounded-xl shadow-inner border mx-2 sm:mx-8 mt-1 overflow-x-auto scrollbar-hide z-20 relative snap-x
         ${isJapanese ? 'bg-stone-100 border-stone-200' : 'bg-stone-200 border-stone-300'}
      `}>
        <button
            onClick={() => onSetMode('PREP')}
            disabled={isCooking}
            className={`
                flex-1 py-2 sm:py-3 px-3 rounded-lg font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all whitespace-nowrap min-w-fit border-b-4 relative active:border-b-0 active:top-1 snap-start
                ${mode === 'PREP' 
                    ? `bg-white text-stone-800 shadow-sm ${isJapanese ? 'border-stone-200' : 'border-stone-300'}`
                    : `bg-stone-300 text-stone-500 hover:bg-stone-200 ${isJapanese ? 'border-stone-300' : 'border-stone-400'}`
                }
            `}
        >
            <Utensils size={14} className="sm:w-4 sm:h-4" />
            <span className={`text-[10px] sm:text-sm tracking-wide ${isJapanese ? '' : 'font-display'}`}>{t('prepStation', language)}</span>
            {mode === 'PREP' && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>}
        </button>
        <div className="w-1 shrink-0"></div>
        <button
            onClick={() => onSetMode('MARINATE')}
            disabled={isCooking}
            className={`
                flex-1 py-2 sm:py-3 px-3 rounded-lg font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all whitespace-nowrap min-w-fit border-b-4 relative active:border-b-0 active:top-1 snap-start
                ${mode === 'MARINATE' 
                    ? `bg-white text-stone-800 shadow-sm ${isJapanese ? 'border-stone-200' : 'border-stone-300'}`
                    : `bg-stone-300 text-stone-500 hover:bg-stone-200 ${isJapanese ? 'border-stone-300' : 'border-stone-400'}`
                }
            `}
        >
            <Droplets size={14} className="sm:w-4 sm:h-4" />
            <span className={`text-[10px] sm:text-sm tracking-wide ${isJapanese ? '' : 'font-display'}`}>{t('marinateStation', language)}</span>
            {mode === 'MARINATE' && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>}
        </button>
        <div className="w-1 shrink-0"></div>
        <button
            onClick={() => onSetMode('BAR')}
            disabled={isCooking}
            className={`
                flex-1 py-2 sm:py-3 px-3 rounded-lg font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all whitespace-nowrap min-w-fit border-b-4 relative active:border-b-0 active:top-1 snap-start
                ${mode === 'BAR' 
                    ? `bg-white text-stone-800 shadow-sm ${isJapanese ? 'border-stone-200' : 'border-stone-300'}`
                    : `bg-stone-300 text-stone-500 hover:bg-stone-200 ${isJapanese ? 'border-stone-300' : 'border-stone-400'}`
                }
            `}
        >
            <Martini size={14} className="sm:w-4 sm:h-4" />
            <span className={`text-[10px] sm:text-sm tracking-wide ${isJapanese ? '' : 'font-display'}`}>{t('barStation', language)}</span>
            {mode === 'BAR' && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>}
        </button>
        <div className="w-1 shrink-0"></div>
        <button
            onClick={() => onSetMode('COOK')}
            disabled={isCooking}
            className={`
                flex-1 py-2 sm:py-3 px-3 rounded-lg font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all whitespace-nowrap min-w-fit border-b-4 relative active:border-b-0 active:top-1 snap-start
                ${mode === 'COOK' 
                    ? `bg-white text-stone-800 shadow-sm ${isJapanese ? 'border-stone-200' : 'border-stone-300'}`
                    : `bg-stone-300 text-stone-500 hover:bg-stone-200 ${isJapanese ? 'border-stone-300' : 'border-stone-400'}`
                }
            `}
        >
            <span className="text-sm sm:text-lg">🔥</span>
            <span className={`text-[10px] sm:text-sm tracking-wide ${isJapanese ? '' : 'font-display'}`}>{t('cookingStation', language)}</span>
            {mode === 'COOK' && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>}
        </button>
      </div>
  );
};
