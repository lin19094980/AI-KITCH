

import React, { useState } from 'react';
import { INGREDIENTS, SEASONINGS } from '../constants';
import { Ingredient, Language, GameMode, Theme } from '../types';
import { Plus, ChevronDown, ChevronRight, Apple, Beef, Carrot, Wheat, Milk, Cookie, Spline, Flame, Nut, Droplets, Beer, Martini, Citrus } from 'lucide-react';
import { t } from '../translations';

interface PantryProps {
  onSpawnItem: (ingredient: Ingredient) => void;
  language: Language;
  gameMode: GameMode;
  money: number;
  theme: Theme;
}

interface CategoryGroupProps {
  title: string;
  icon: React.ReactNode;
  items: Ingredient[];
  isOpen: boolean;
  onToggle: () => void;
  onSpawnItem: (ingredient: Ingredient) => void;
  language: Language;
  gameMode: GameMode;
  money: number;
  theme: Theme;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({ 
  title, 
  icon, 
  items, 
  isOpen, 
  onToggle, 
  onSpawnItem, 
  language, 
  gameMode, 
  money,
  theme
}) => {
  if (items.length === 0) return null;

  const isJapanese = theme === 'japanese';

  return (
    <div className={`rounded-xl border-2 shadow-inner overflow-hidden transition-all duration-300
        ${isJapanese ? 'bg-[#f0ece0]/80 border-[#8c8468] rounded-md' : 'bg-[#f3e6d3]/80 border-[#d4c09d] rounded-xl'}
    `}>
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-3 transition-colors border-b
            ${isJapanese 
                ? 'bg-[#e2dccc] hover:bg-[#d4cebd] border-[#8c8468]/50' 
                : 'bg-[#eaddc5] hover:bg-[#e4d3b6] border-[#d4c09d]/50'}
        `}
      >
        <div className="flex items-center gap-2">
           <span className={`${isJapanese ? 'text-jp-800' : 'text-[#8c6b4a]'}`}>{icon}</span>
           <span className={`font-black uppercase tracking-wider text-xs sm:text-sm ${isJapanese ? 'text-jp-800' : 'text-[#8c6b4a] font-display'}`}>{title}</span>
           <span className={`text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isJapanese ? 'bg-jp-600' : 'bg-[#d4c09d]'}`}>{items.length}</span>
        </div>
        <div className={`${isJapanese ? 'text-jp-800' : 'text-[#8c6b4a]'}`}>
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-2 sm:p-3 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 animate-slide-up">
           {items.map((item) => {
            const displayName = language === 'zh' ? item.nameZh || item.name : item.name;
            const canAfford = gameMode !== 'CHALLENGE' || money >= item.price;

            return (
              <button
                key={item.id}
                onClick={() => canAfford && onSpawnItem(item)}
                disabled={!canAfford}
                title={`${displayName} ${gameMode === 'CHALLENGE' ? `($${item.price})` : ''}`}
                className={`
                  relative group flex flex-col items-center justify-center p-1.5 sm:p-2 pb-2 sm:pb-3 rounded-lg transition-all duration-200
                  border
                  ${canAfford 
                      ? `bg-white cursor-pointer shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-xl active:scale-95 active:shadow-inner ${isJapanese ? 'border-stone-200 hover:border-jp-indigo' : 'border-stone-100 hover:border-chef-200'}` 
                      : 'bg-stone-200 opacity-60 cursor-not-allowed grayscale border-stone-200'
                  }
                `}
              >
                <div className="text-2xl sm:text-3xl mb-1 drop-shadow-sm transform transition-transform group-hover:scale-110">
                  {item.emoji}
                </div>
                <span className={`text-[9px] sm:text-[11px] font-bold text-stone-600 truncate w-full text-center px-1 tracking-tight leading-tight ${isJapanese ? '' : 'font-display'}`}>
                  {displayName}
                </span>
                
                {gameMode === 'CHALLENGE' && (
                    <div className={`
                        absolute top-1 right-1 text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm
                        ${canAfford ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                    `}>
                        ${item.price}
                    </div>
                )}
                
                {canAfford && (
                    <div className={`absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-white rounded-full p-0.5 w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center shadow-sm ${isJapanese ? 'bg-jp-indigo' : 'bg-chef-500'}`}>
                        <Plus size={8} strokeWidth={4} />
                    </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Pantry: React.FC<PantryProps> = ({ 
  onSpawnItem,
  language,
  gameMode,
  money,
  theme
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    protein: true,
    vegetable: false,
    starch: false,
    fruit: false,
    nuts: false,
    dairy_misc: false,
    drinks: false,
    alcohol: false,
    basic_spice: true,
    sauce_oil: false,
    aromatic: false,
    baking: false,
    garnish: false
  });

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getFreshGroups = () => {
    const fruits = ['apple', 'strawberry', 'banana', 'blueberry', 'cherry', 'orange', 'mango', 'durian', 'avocado'];
    const nuts = ['almond', 'walnut', 'peanut'];
    const drinks = [
        'water', 'coffee', 'tea', 'cola', 'soda_water', 'tonic_water', 'ginger_beer', 'cranberry_juice', 'coconut_milk',
        'orange_juice', 'apple_juice', 'pineapple_juice', 'tomato_juice', 'lemonade', 'iced_tea', 'energy_drink', 
        'grapefruit_juice', 'root_beer', 'lemon_lime_soda'
    ];
    
    return {
      protein: INGREDIENTS.filter(i => i.category === 'protein'),
      vegetable: INGREDIENTS.filter(i => i.category === 'vegetable'),
      starch: INGREDIENTS.filter(i => i.category === 'starch'),
      fruit: INGREDIENTS.filter(i => fruits.includes(i.id)),
      nuts: INGREDIENTS.filter(i => nuts.includes(i.id)),
      drinks: INGREDIENTS.filter(i => drinks.includes(i.id)),
      alcohol: INGREDIENTS.filter(i => i.category === 'alcohol'),
      dairy_misc: INGREDIENTS.filter(i => i.category === 'misc' && !fruits.includes(i.id) && !nuts.includes(i.id) && !drinks.includes(i.id)),
    };
  };

  const getSeasoningGroups = () => {
    const basic = ['salt', 'pepper', 'sugar', 'brown_sugar', 'honey', 'msg', 'powdered_sugar'];
    const sauces = ['soysauce', 'vinegar', 'cooking_wine', 'oliveoil', 'sesame_oil', 'truffle_oil', 'chili', 'butter', 'wasabi'];
    const aromatics = ['garlic', 'ginger', 'fresh_chili', 'herb', 'five_spice', 'curry_powder', 'cumin', 'saffron', 'gold_leaf'];
    const baking = ['vanilla', 'cinnamon', 'cocoa', 'matcha', 'yeast', 'baking_powder', 'baking_soda'];
    const garnish = ['ice', 'mint', 'lemon', 'lime', 'olive'];

    return {
      basic_spice: SEASONINGS.filter(i => basic.includes(i.id)),
      sauce_oil: SEASONINGS.filter(i => sauces.includes(i.id)),
      aromatic: SEASONINGS.filter(i => aromatics.includes(i.id)),
      baking: SEASONINGS.filter(i => baking.includes(i.id)),
      garnish: SEASONINGS.filter(i => garnish.includes(i.id)),
    };
  };

  const fresh = getFreshGroups();
  const seasoning = getSeasoningGroups();
  const isJapanese = theme === 'japanese';

  return (
    <div className={`p-2 h-full overflow-y-auto custom-scrollbar border-r-8 shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)] relative pb-[calc(0.5rem+env(safe-area-inset-bottom))]
         ${isJapanese ? 'bg-[#dcd3b2] border-[#8c8468]' : 'bg-[#e8d5b5] border-[#c7a677]'}
    `}>
      <div className={`absolute inset-0 opacity-50 pointer-events-none z-0 ${isJapanese ? 'bg-tatami opacity-30' : 'bg-wood'}`}></div>

      <div className="relative z-10 space-y-2 p-1">
        
        <div className="flex items-center gap-2 mb-2 mt-2 px-2 opacity-80">
           <div className={`h-px flex-1 ${isJapanese ? 'bg-jp-800' : 'bg-[#8c6b4a]'}`}></div>
           <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${isJapanese ? 'text-jp-800' : 'text-[#8c6b4a]'}`}>{t('freshIngredients', language)}</span>
           <div className={`h-px flex-1 ${isJapanese ? 'bg-jp-800' : 'bg-[#8c6b4a]'}`}></div>
        </div>

        <CategoryGroup title={t('cat_alcohol', language)} icon={<Martini size={16} />} items={fresh.alcohol} isOpen={expanded.alcohol} onToggle={() => toggle('alcohol')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_drinks', language)} icon={<Beer size={16} />} items={fresh.drinks} isOpen={expanded.drinks} onToggle={() => toggle('drinks')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_protein', language)} icon={<Beef size={16} />} items={fresh.protein} isOpen={expanded.protein} onToggle={() => toggle('protein')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_vegetable', language)} icon={<Carrot size={16} />} items={fresh.vegetable} isOpen={expanded.vegetable} onToggle={() => toggle('vegetable')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_starch', language)} icon={<Wheat size={16} />} items={fresh.starch} isOpen={expanded.starch} onToggle={() => toggle('starch')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_fruit', language)} icon={<Apple size={16} />} items={fresh.fruit} isOpen={expanded.fruit} onToggle={() => toggle('fruit')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_nuts', language)} icon={<Nut size={16} />} items={fresh.nuts} isOpen={expanded.nuts} onToggle={() => toggle('nuts')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_dairy_misc', language)} icon={<Milk size={16} />} items={fresh.dairy_misc} isOpen={expanded.dairy_misc} onToggle={() => toggle('dairy_misc')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />

        <div className="flex items-center gap-2 mb-2 mt-6 px-2 opacity-80">
           <div className={`h-px flex-1 ${isJapanese ? 'bg-jp-800' : 'bg-[#8c6b4a]'}`}></div>
           <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${isJapanese ? 'text-jp-800' : 'text-[#8c6b4a]'}`}>{t('seasoningRack', language)}</span>
           <div className={`h-px flex-1 ${isJapanese ? 'bg-jp-800' : 'bg-[#8c6b4a]'}`}></div>
        </div>

        <CategoryGroup title={t('cat_garnish', language)} icon={<Citrus size={16} />} items={seasoning.garnish} isOpen={expanded.garnish} onToggle={() => toggle('garnish')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_basic_spice', language)} icon={<Spline size={16} />} items={seasoning.basic_spice} isOpen={expanded.basic_spice} onToggle={() => toggle('basic_spice')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_sauce_oil', language)} icon={<Droplets size={16} />} items={seasoning.sauce_oil} isOpen={expanded.sauce_oil} onToggle={() => toggle('sauce_oil')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_aromatic', language)} icon={<Flame size={16} />} items={seasoning.aromatic} isOpen={expanded.aromatic} onToggle={() => toggle('aromatic')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        <CategoryGroup title={t('cat_baking', language)} icon={<Cookie size={16} />} items={seasoning.baking} isOpen={expanded.baking} onToggle={() => toggle('baking')} onSpawnItem={onSpawnItem} language={language} gameMode={gameMode} money={money} theme={theme} />
        
        <div className="h-12"></div>
      </div>
    </div>
  );
};
