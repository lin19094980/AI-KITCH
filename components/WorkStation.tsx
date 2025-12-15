
import React, { useState, useEffect, useRef } from 'react';
import { KitchenItem, PrepMethod, HeatMethod, MixMethod, DishResult, Customer, AnyCookingMethod, Language, GameMode, CookingPrecision, Theme } from '../types';
import { COOKING_CONSTANTS } from '../constants';
import { StationSelector } from './StationSelector';
import { StationVisuals } from './StationVisuals';
import { StationControls } from './StationControls';

interface WorkStationProps {
  mode: 'PREP' | 'MARINATE' | 'COOK' | 'BAR';
  onSetMode: (mode: 'PREP' | 'MARINATE' | 'COOK' | 'BAR') => void;
  
  // Prep Props
  prepItems: KitchenItem[];
  onPrepAction: (method: PrepMethod) => void;
  onRemovePrepItem: (item: KitchenItem) => void;
  
  // Marinate Props
  marinateItems: KitchenItem[];
  onRemoveMarinateItem: (item: KitchenItem) => void;
  onMarinateAction: () => void;

  // Bar Props
  barItems: KitchenItem[];
  onRemoveBarItem: (item: KitchenItem) => void;
  selectedMix: MixMethod | null;
  onSelectMix: (method: MixMethod) => void;

  // Cook Props
  potItems: KitchenItem[];
  onRemovePotItem: (item: KitchenItem) => void;
  onCook: (precision: CookingPrecision) => void;
  onStartCooking: () => void;
  selectedHeat: HeatMethod | 'raw' | null;
  onSelectHeat: (method: HeatMethod | 'raw') => void;
  
  // Shared
  isCooking: boolean;
  history: DishResult[];
  onShowHistory: (dish: DishResult) => void;
  currentCustomer: Customer | null;
  isLoadingCustomer?: boolean;
  activeAnimationMethod?: AnyCookingMethod | null;
  language: Language;
  gameMode: GameMode | null;
  timeLeft: number;
  isSubmitting: boolean;
  theme: Theme;
}

export const WorkStation: React.FC<WorkStationProps> = ({
  mode,
  onSetMode,
  prepItems,
  onPrepAction,
  onRemovePrepItem,
  marinateItems,
  onRemoveMarinateItem,
  onMarinateAction,
  barItems,
  onRemoveBarItem,
  selectedMix,
  onSelectMix,
  potItems,
  onRemovePotItem,
  onCook,
  onStartCooking,
  selectedHeat,
  onSelectHeat,
  isCooking,
  currentCustomer,
  isLoadingCustomer = false,
  activeAnimationMethod,
  language,
  gameMode,
  timeLeft,
  isSubmitting,
  theme
}) => {
  
  // --- Active Cooking State ---
  const [cookingProgress, setCookingProgress] = useState(0); // Coarse progress for logic/visual thresholds
  const cookingTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Start Cooking Loop (Only for Heat Methods OR Mix Methods)
  useEffect(() => {
    if (isCooking && (
        (mode === 'COOK' && selectedHeat && selectedHeat !== 'raw') ||
        (mode === 'BAR' && selectedMix)
    )) {
      setCookingProgress(0);
      startTimeRef.current = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const rawProgress = (elapsed / COOKING_CONSTANTS.DURATION_MS) * 100;
        
        if (rawProgress >= 100) {
           setCookingProgress(100);
           // Auto-stop at 100% (Burnt/Over-diluted)
           handleStopCooking(100);
        } else {
           // PERFORMANCE OPTIMIZATION:
           // Only update React state when crossing visual thresholds to prevent 60fps re-renders of the whole tree.
           // Thresholds: 
           // 20% (Raw filter removed)
           // 45% (Perfect Start)
           // 90% (Perfect End/Burnt)
           
           setCookingProgress(prev => {
               // Define zones: 0: <20, 1: 20-45, 2: 45-90, 3: >90
               const getZone = (p: number) => {
                  if (p < 20) return 0;
                  if (p < COOKING_CONSTANTS.PERFECT_START) return 1;
                  if (p < COOKING_CONSTANTS.PERFECT_END) return 2;
                  return 3;
               };
               
               const currentZone = getZone(prev);
               const newZone = getZone(rawProgress);
               
               if (currentZone !== newZone) {
                   return rawProgress; // Update state to trigger re-render for visual changes
               }
               return prev; // No change, keep old progress for now
           });

           cookingTimerRef.current = requestAnimationFrame(animate);
        }
      };
      
      cookingTimerRef.current = requestAnimationFrame(animate);
    } else {
       // Reset if not cooking or using prep/raw
       if (!isCooking) setCookingProgress(0);
       if (cookingTimerRef.current) cancelAnimationFrame(cookingTimerRef.current);
    }

    return () => {
        if (cookingTimerRef.current) cancelAnimationFrame(cookingTimerRef.current);
    };
  }, [isCooking, selectedHeat, selectedMix, mode]);

  const handleStopCooking = (finalProgress?: number) => {
      if (cookingTimerRef.current) cancelAnimationFrame(cookingTimerRef.current);
      
      // Calculate precise progress based on time if not provided
      let progress = finalProgress;
      if (typeof progress !== 'number') {
           const elapsed = Date.now() - startTimeRef.current;
           progress = (elapsed / COOKING_CONSTANTS.DURATION_MS) * 100;
      }
      
      // Clamp
      if (progress > 100) progress = 100;
      setCookingProgress(progress); // Ensure final visual state is correct
      
      let result: CookingPrecision = 'undercooked';
      
      if (progress < COOKING_CONSTANTS.PERFECT_START) {
          result = 'undercooked';
      } else if (progress >= COOKING_CONSTANTS.PERFECT_START && progress <= COOKING_CONSTANTS.PERFECT_END) {
          result = 'perfect';
      } else {
          result = 'burnt';
      }

      onCook(result);
  };

  const handleCookClick = () => {
      // If disabled or submitting, do nothing (extra safety)
      if (isSubmitting) return;

      if (isCooking) {
          // It's a STOP button - calculate current progress via time
          handleStopCooking(); 
      } else {
          // It's a START button
          // If raw, just send immediately
          if (mode === 'COOK' && selectedHeat === 'raw') {
              onCook('perfect');
          } else {
              // Start the progress animation (logic handled in useEffect via isCooking prop which parent toggles)
              onStartCooking(); 
          }
      }
  };

  const handleRemoveItem = (item: KitchenItem, fromMode: string) => {
      if (fromMode === 'PREP') onRemovePrepItem(item);
      else if (fromMode === 'MARINATE') onRemoveMarinateItem(item);
      else if (fromMode === 'BAR') onRemoveBarItem(item);
      else onRemovePotItem(item);
  };

  const canCook = potItems.length > 0 && selectedHeat !== null;
  const canBar = barItems.length > 0 && selectedMix !== null;
  const canMarinate = marinateItems.length > 0;

  return (
    <div className="flex flex-col min-h-full gap-2 sm:gap-4 pb-36 sm:pb-44 relative pt-[calc(5rem+env(safe-area-inset-top))] md:pt-4"> 
      
      <StationSelector 
         mode={mode} 
         onSetMode={onSetMode} 
         isCooking={isCooking} 
         language={language} 
         theme={theme}
      />

      <StationVisuals 
         mode={mode}
         theme={theme}
         language={language}
         activeAnimationMethod={activeAnimationMethod}
         selectedHeat={selectedHeat}
         selectedMix={selectedMix}
         cookingProgress={cookingProgress}
         cookingStartTime={startTimeRef.current}
         isCooking={isCooking}
         isSubmitting={isSubmitting}
         potItems={potItems}
         prepItems={prepItems}
         marinateItems={marinateItems}
         barItems={barItems}
         onRemoveItem={handleRemoveItem}
         currentCustomer={currentCustomer}
         isLoadingCustomer={isLoadingCustomer}
         timeLeft={timeLeft}
         gameMode={gameMode}
      />

      <StationControls
         mode={mode}
         theme={theme}
         language={language}
         isCooking={isCooking}
         isSubmitting={isSubmitting}
         activeAnimationMethod={activeAnimationMethod}
         prepItemCount={prepItems.length}
         onPrepAction={onPrepAction}
         canMarinate={canMarinate}
         onMarinateAction={onMarinateAction}
         canBar={canBar}
         selectedMix={selectedMix}
         onSelectMix={onSelectMix}
         canCook={canCook}
         selectedHeat={selectedHeat}
         onSelectHeat={onSelectHeat}
         onCookClick={handleCookClick}
      />
      
    </div>
  );
};
