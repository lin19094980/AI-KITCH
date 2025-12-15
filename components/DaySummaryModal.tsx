
import React from 'react';
import { Language } from '../types';
import { t } from '../translations';
import { CalendarCheck, DollarSign, ArrowRight, AlertTriangle } from 'lucide-react';

interface DaySummaryModalProps {
  day: number;
  dailyRevenue: number;
  rentCost: number;
  currentBalance: number; // Balance BEFORE rent deduction
  onNextDay: () => void;
  onGameOver: () => void;
  language: Language;
}

export const DaySummaryModal: React.FC<DaySummaryModalProps> = ({
  day,
  dailyRevenue,
  rentCost,
  currentBalance,
  onNextDay,
  onGameOver,
  language
}) => {
  const finalBalance = currentBalance - rentCost;
  const isBankrupt = finalBalance < 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm animate-fadeIn"></div>
      
      <div className="bg-white w-full max-w-sm rounded-none sm:rounded-sm shadow-2xl relative z-10 p-0 overflow-hidden animate-slide-up rotate-1 border-2 border-stone-200">
        
        {/* Receipt Header */}
        <div className="bg-stone-100 p-6 border-b-2 border-dashed border-stone-300 text-center relative">
           <div className="w-12 h-12 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <CalendarCheck size={24} />
           </div>
           <h2 className="text-2xl font-display font-black text-stone-800 uppercase tracking-widest">{t('dailyReport', language)}</h2>
           <p className="text-stone-500 font-mono text-sm">{t('day', language)} {day}</p>
           
           {/* Receipt Zigzag top */}
           <div className="absolute top-0 left-0 right-0 h-2 bg-[linear-gradient(45deg,transparent_75%,white_75%),linear-gradient(-45deg,transparent_75%,white_75%)] bg-[length:10px_10px]"></div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 bg-[#fffdf5] font-mono text-stone-700 space-y-4">
            
            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span>{t('dailyRevenue', language)}</span>
                <span className="text-green-600 font-bold">+${dailyRevenue}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span>{t('rent', language)}</span>
                <span className="text-red-600 font-bold">-${rentCost}</span>
            </div>

            <div className="flex justify-between items-center pt-2 text-lg">
                <span className="font-bold text-stone-800">{t('totalBalance', language)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-stone-400">
                <span>(Pre-Rent: ${currentBalance})</span>
                <span className={`text-2xl font-black ${isBankrupt ? 'text-red-600' : 'text-stone-800'}`}>
                    ${finalBalance}
                </span>
            </div>
            
            {/* Stamp */}
            <div className="flex justify-center py-4">
                {isBankrupt ? (
                    <div className="border-4 border-red-500 text-red-500 font-black text-xl px-4 py-1 rounded rotate-[-12deg] opacity-80 uppercase tracking-widest">
                        {t('insufficientFunds', language)}
                    </div>
                ) : (
                    <div className="border-4 border-green-500 text-green-500 font-black text-xl px-4 py-1 rounded rotate-[-12deg] opacity-80 uppercase tracking-widest">
                        PAID
                    </div>
                )}
            </div>

        </div>

        {/* Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200">
            {isBankrupt ? (
                <button 
                    onClick={onGameOver}
                    className="w-full py-4 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                    <AlertTriangle size={20} />
                    <span>{t('bankrupt', language)}</span>
                </button>
            ) : (
                <button 
                    onClick={onNextDay}
                    className="w-full py-4 bg-stone-800 text-white rounded-xl font-bold shadow-lg hover:bg-stone-900 transition-all flex items-center justify-center gap-2 group"
                >
                    <span>{t('startNextDay', language)}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            )}
        </div>

        {/* Receipt Zigzag bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[linear-gradient(135deg,transparent_75%,#fafaf9_75%),linear-gradient(-135deg,transparent_75%,#fafaf9_75%)] bg-[length:10px_10px]"></div>

      </div>
    </div>
  );
};
