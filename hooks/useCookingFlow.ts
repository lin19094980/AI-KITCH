import { useState, useEffect } from 'react';
import { DishResult, AnyCookingMethod, KitchenItem, Customer, CookingPrecision, PrepMethod, Language } from '../types';
import { cookDish } from '../services/geminiService';
import { audioService } from '../services/audioService';

export const useCookingFlow = (language: Language) => {
    const [isCooking, setIsCooking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeAnimationMethod, setActiveAnimationMethod] = useState<AnyCookingMethod | null>(null);
    const [lastResult, setLastResult] = useState<DishResult | null>(null);
    const [history, setHistory] = useState<DishResult[]>([]);

    // Load History
    useEffect(() => {
        const savedHistory = localStorage.getItem('ai-pocket-kitchen-history');
        if (savedHistory) {
            try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
        }
    }, []);

    // Save History
    useEffect(() => {
        try {
             const historyToSave = history.slice(0, 50).map(dish => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { imageUrl, ...rest } = dish;
                return rest;
              });
             localStorage.setItem('ai-pocket-kitchen-history', JSON.stringify(historyToSave));
        } catch (e) {}
    }, [history]);

    const performPrep = async (items: KitchenItem[], method: PrepMethod, callback: (processed: KitchenItem[]) => void) => {
        setIsCooking(true);
        setActiveAnimationMethod(method);
        audioService.startCookingSound(method);
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        audioService.stopCookingSound();
        setIsCooking(false);
        setActiveAnimationMethod(null);

        const processed = items.map(item => {
            let newStatus = item.status;
            if (method === PrepMethod.CHOP) newStatus = 'chopped';
            if (method === PrepMethod.BLEND) newStatus = 'blended';
            if (method === PrepMethod.AIR_DRY) newStatus = 'dried';
            return { ...item, status: newStatus };
        });
        callback(processed);
    };

    const performMarinate = async (items: KitchenItem[], callback: (processed: KitchenItem[]) => void) => {
         setIsCooking(true);
         setActiveAnimationMethod(PrepMethod.MARINATE);
         audioService.startCookingSound(PrepMethod.MARINATE);
         
         await new Promise(resolve => setTimeout(resolve, 2000));
         
         audioService.stopCookingSound();
         setIsCooking(false);
         setActiveAnimationMethod(null);

         const marinadeLiquids = ['milk', 'cream', 'oil', 'butter', 'soysauce', 'vinegar', 'cola', 'wine', 'water'];
         const spices = items.filter(i => i.category === 'spice' || marinadeLiquids.includes(i.id));
         const bases = items.filter(i => !spices.includes(i));
         const spiceNames = spices.map(s => language === 'zh' ? s.nameZh || s.name : s.name);

         let processed: KitchenItem[] = [];
         if (bases.length > 0) {
             processed = bases.map(item => ({
                 ...item,
                 status: item.status === 'raw' ? 'marinated' : item.status,
                 marinadeLabels: [...(item.marinadeLabels || []), ...spiceNames]
             }));
         } else {
             processed = spices;
         }
         callback(processed);
    };

    const performCook = async (
        items: KitchenItem[], 
        method: AnyCookingMethod | null, 
        customer: Customer | null,
        precision: CookingPrecision
    ) => {
        audioService.stopCookingSound();
        setIsSubmitting(true);
        setIsCooking(true);
        setActiveAnimationMethod(method);

        try {
            const result = await cookDish(items, method, customer, language, precision);
            setLastResult(result);
            setHistory(prev => [result, ...prev]);
            return result;
        } catch (e) {
            console.error(e);
            return null;
        } finally {
            setIsSubmitting(false);
            setIsCooking(false);
            setActiveAnimationMethod(null);
        }
    };
    
    const startCookingAnimation = (method: AnyCookingMethod) => {
        setIsCooking(true);
        setActiveAnimationMethod(method);
        audioService.startCookingSound(method);
    };
    
    const resetResult = () => setLastResult(null);

    return {
        isCooking,
        isSubmitting,
        activeAnimationMethod,
        lastResult, setLastResult,
        resetResult,
        history, 
        performPrep,
        performMarinate,
        performCook,
        startCookingAnimation
    };
};