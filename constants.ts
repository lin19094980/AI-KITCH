
import { Ingredient, PrepMethod, HeatMethod, MixMethod, Customer } from './types';
import { 
  Flame, 
  Thermometer, 
  Waves,
  Scissors,
  Zap,
  Droplets,
  Wind,
  Martini,
  RotateCw,
  Layers
} from 'lucide-react';

export const COOKING_CONSTANTS = {
  DURATION_MS: 8000,
  PERFECT_START: 45,
  PERFECT_END: 90
};

export const INGREDIENTS: Ingredient[] = [
  // Proteins (High Cost)
  { id: 'beef', name: 'Steak', nameZh: '牛排', emoji: '🥩', category: 'protein', color: 'bg-red-100', price: 25 },
  { id: 'wagyu', name: 'A5 Wagyu', nameZh: 'A5和牛', emoji: '🥩', category: 'protein', color: 'bg-red-200 border-2 border-amber-200', price: 80 },
  { id: 'chicken', name: 'Chicken', nameZh: '鸡肉', emoji: '🍗', category: 'protein', color: 'bg-orange-100', price: 15 },
  { id: 'pork', name: 'Pork Belly', nameZh: '五花肉', emoji: '🥓', category: 'protein', color: 'bg-red-200', price: 18 },
  { id: 'foie_gras', name: 'Foie Gras', nameZh: '鹅肝', emoji: '🦆', category: 'protein', color: 'bg-orange-50', price: 60 },
  { id: 'egg', name: 'Egg', nameZh: '鸡蛋', emoji: '🥚', category: 'protein', color: 'bg-yellow-100', price: 5 },
  { id: 'fish', name: 'Fish', nameZh: '鱼', emoji: '🐟', category: 'protein', color: 'bg-blue-100', price: 20 },
  { id: 'salmon', name: 'Salmon', nameZh: '三文鱼', emoji: '🍣', category: 'protein', color: 'bg-orange-200', price: 28 },
  { id: 'shrimp', name: 'Shrimp', nameZh: '虾', emoji: '🦐', category: 'protein', color: 'bg-orange-50', price: 22 },
  { id: 'lobster', name: 'Lobster', nameZh: '龙虾', emoji: '🦞', category: 'protein', color: 'bg-red-600 text-white', price: 45 },
  { id: 'scallop', name: 'Scallop', nameZh: '扇贝', emoji: '🐚', category: 'protein', color: 'bg-stone-50', price: 25 },
  { id: 'caviar', name: 'Caviar', nameZh: '鱼子酱', emoji: '⚫', category: 'protein', color: 'bg-stone-900 text-white', price: 100 },
  { id: 'tofu', name: 'Tofu', nameZh: '豆腐', emoji: '🧊', category: 'protein', color: 'bg-stone-100', price: 5 },
  
  // Vegetables (Low Cost)
  { id: 'carrot', name: 'Carrot', nameZh: '胡萝卜', emoji: '🥕', category: 'vegetable', color: 'bg-orange-100', price: 3 },
  { id: 'broccoli', name: 'Broccoli', nameZh: '西兰花', emoji: '🥦', category: 'vegetable', color: 'bg-green-100', price: 4 },
  { id: 'spinach', name: 'Spinach', nameZh: '菠菜', emoji: '🥬', category: 'vegetable', color: 'bg-green-200', price: 4 },
  { id: 'tomato', name: 'Tomato', nameZh: '番茄', emoji: '🍅', category: 'vegetable', color: 'bg-red-100', price: 4 },
  { id: 'onion', name: 'Onion', nameZh: '洋葱', emoji: '🧅', category: 'vegetable', color: 'bg-purple-100', price: 3 },
  { id: 'pepper_bell', name: 'Bell Pepper', nameZh: '彩椒', emoji: '🫑', category: 'vegetable', color: 'bg-red-50', price: 5 },
  { id: 'eggplant', name: 'Eggplant', nameZh: '茄子', emoji: '🍆', category: 'vegetable', color: 'bg-purple-200', price: 5 },
  { id: 'mushroom', name: 'Mushroom', nameZh: '蘑菇', emoji: '🍄', category: 'vegetable', color: 'bg-stone-200', price: 6 },
  { id: 'truffle', name: 'Black Truffle', nameZh: '黑松露', emoji: '🍄‍🟫', category: 'vegetable', color: 'bg-stone-800 text-white', price: 90 },
  { id: 'matsutake', name: 'Matsutake', nameZh: '松茸', emoji: '🍄', category: 'vegetable', color: 'bg-amber-100', price: 70 },
  { id: 'asparagus', name: 'Asparagus', nameZh: '芦笋', emoji: '🎋', category: 'vegetable', color: 'bg-green-300', price: 8 },
  { id: 'corn', name: 'Corn', nameZh: '玉米', emoji: '🌽', category: 'vegetable', color: 'bg-yellow-200', price: 4 },
  { id: 'pumpkin', name: 'Pumpkin', nameZh: '南瓜', emoji: '🎃', category: 'vegetable', color: 'bg-orange-200', price: 5 },

  // Starches (Medium Cost)
  { id: 'rice', name: 'Rice', nameZh: '米饭', emoji: '🍚', category: 'starch', color: 'bg-white', price: 5 },
  { id: 'noodles', name: 'Noodles', nameZh: '面条', emoji: '🍜', category: 'starch', color: 'bg-yellow-50', price: 6 },
  { id: 'pasta', name: 'Pasta', nameZh: '意面', emoji: '🍝', category: 'starch', color: 'bg-yellow-100', price: 6 },
  { id: 'bread', name: 'Bread', nameZh: '面包', emoji: '🍞', category: 'starch', color: 'bg-amber-100', price: 5 },
  { id: 'flour', name: 'Flour', nameZh: '面粉', emoji: '🥡', category: 'starch', color: 'bg-stone-50', price: 4 },
  { id: 'oats', name: 'Oats', nameZh: '燕麦', emoji: '🌾', category: 'starch', color: 'bg-amber-50', price: 4 },
  { id: 'potato', name: 'Potato', nameZh: '土豆', emoji: '🥔', category: 'starch', color: 'bg-amber-200', price: 4 },

  // Misc & Dairy (Medium Cost)
  { id: 'cheese', name: 'Cheese', nameZh: '芝士', emoji: '🧀', category: 'misc', color: 'bg-yellow-300', price: 10 },
  { id: 'milk', name: 'Milk', nameZh: '牛奶', emoji: '🥛', category: 'misc', color: 'bg-blue-50', price: 6 },
  { id: 'cream', name: 'Heavy Cream', nameZh: '奶油', emoji: '🍶', category: 'misc', color: 'bg-stone-50', price: 8 },
  { id: 'yogurt', name: 'Yogurt', nameZh: '酸奶', emoji: '🍦', category: 'misc', color: 'bg-white', price: 6 },
  { id: 'apple', name: 'Apple', nameZh: '苹果', emoji: '🍎', category: 'misc', color: 'bg-red-300', price: 5 },
  { id: 'strawberry', name: 'Strawberry', nameZh: '草莓', emoji: '🍓', category: 'misc', color: 'bg-pink-200', price: 8 },
  { id: 'banana', name: 'Banana', nameZh: '香蕉', emoji: '🍌', category: 'misc', color: 'bg-yellow-100', price: 4 },
  { id: 'blueberry', name: 'Blueberry', nameZh: '蓝莓', emoji: '🫐', category: 'misc', color: 'bg-blue-200', price: 6 },
  { id: 'cherry', name: 'Cherry', nameZh: '樱桃', emoji: '🍒', category: 'misc', color: 'bg-red-200', price: 7 },
  { id: 'orange', name: 'Orange', nameZh: '橙子', emoji: '🍊', category: 'misc', color: 'bg-orange-300', price: 5 },
  { id: 'mango', name: 'Mango', nameZh: '芒果', emoji: '🥭', category: 'misc', color: 'bg-yellow-400', price: 6 },
  { id: 'durian', name: 'Durian', nameZh: '榴莲', emoji: '🍈', category: 'misc', color: 'bg-yellow-600 text-white', price: 20 },
  { id: 'avocado', name: 'Avocado', nameZh: '牛油果', emoji: '🥑', category: 'misc', color: 'bg-green-700 text-white', price: 10 },
  { id: 'almond', name: 'Almond', nameZh: '杏仁', emoji: '🌰', category: 'misc', color: 'bg-stone-300', price: 8 },
  { id: 'walnut', name: 'Walnut', nameZh: '核桃', emoji: '🥥', category: 'misc', color: 'bg-stone-400', price: 8 },
  { id: 'peanut', name: 'Peanut', nameZh: '花生', emoji: '🥜', category: 'misc', color: 'bg-amber-200', price: 4 },
  { id: 'raisin', name: 'Raisin', nameZh: '葡萄干', emoji: '🍇', category: 'misc', color: 'bg-purple-800 text-white', price: 5 },
  { id: 'chocolate', name: 'Chocolate', nameZh: '巧克力', emoji: '🍫', category: 'misc', color: 'bg-brown-400', price: 12 },

  // Drinks & Mixers (Misc)
  { id: 'water', name: 'Water', nameZh: '水', emoji: '💧', category: 'misc', color: 'bg-blue-50', price: 1 },
  { id: 'coffee', name: 'Coffee', nameZh: '咖啡', emoji: '☕', category: 'misc', color: 'bg-stone-700 text-white', price: 4 },
  { id: 'tea', name: 'Tea', nameZh: '茶', emoji: '🍵', category: 'misc', color: 'bg-green-100', price: 3 },
  { id: 'cola', name: 'Cola', nameZh: '可乐', emoji: '🥤', category: 'misc', color: 'bg-red-800 text-white', price: 3 },
  { id: 'soda_water', name: 'Soda Water', nameZh: '苏打水', emoji: '🫧', category: 'misc', color: 'bg-blue-50', price: 2 },
  { id: 'tonic_water', name: 'Tonic Water', nameZh: '汤力水', emoji: '🍋', category: 'misc', color: 'bg-blue-50', price: 3 },
  { id: 'ginger_beer', name: 'Ginger Beer', nameZh: '姜汁啤酒', emoji: '🫚', category: 'misc', color: 'bg-amber-100', price: 4 },
  { id: 'cranberry_juice', name: 'Cranberry Juice', nameZh: '蔓越莓汁', emoji: '🍒', category: 'misc', color: 'bg-red-400', price: 4 },
  { id: 'coconut_milk', name: 'Coconut Milk', nameZh: '椰奶', emoji: '🥥', category: 'misc', color: 'bg-white', price: 4 },
  { id: 'orange_juice', name: 'Orange Juice', nameZh: '橙汁', emoji: '🧃', category: 'misc', color: 'bg-orange-200', price: 4 },
  { id: 'apple_juice', name: 'Apple Juice', nameZh: '苹果汁', emoji: '🧃', category: 'misc', color: 'bg-yellow-100', price: 4 },
  { id: 'pineapple_juice', name: 'Pineapple Juice', nameZh: '菠萝汁', emoji: '🍍', category: 'misc', color: 'bg-yellow-200', price: 4 },
  { id: 'tomato_juice', name: 'Tomato Juice', nameZh: '番茄汁', emoji: '🍅', category: 'misc', color: 'bg-red-500 text-white', price: 4 },
  { id: 'lemonade', name: 'Lemonade', nameZh: '柠檬水', emoji: '🍋', category: 'misc', color: 'bg-yellow-50', price: 3 },
  { id: 'iced_tea', name: 'Iced Tea', nameZh: '冰红茶', emoji: '🥤', category: 'misc', color: 'bg-amber-100', price: 3 },
  { id: 'energy_drink', name: 'Energy Drink', nameZh: '能量饮料', emoji: '⚡', category: 'misc', color: 'bg-yellow-300', price: 5 },
  { id: 'grapefruit_juice', name: 'Grapefruit Juice', nameZh: '西柚汁', emoji: '🍊', category: 'misc', color: 'bg-red-200', price: 4 },
  { id: 'root_beer', name: 'Root Beer', nameZh: '根汁汽水', emoji: '🍺', category: 'misc', color: 'bg-amber-900 text-white', price: 3 },
  { id: 'lemon_lime_soda', name: 'Lemon-Lime Soda', nameZh: '雪碧', emoji: '🥤', category: 'misc', color: 'bg-green-50', price: 3 },

  // Alcohol
  { id: 'beer', name: 'Beer', nameZh: '啤酒', emoji: '🍺', category: 'alcohol', color: 'bg-yellow-200', price: 5 },
  { id: 'red_wine', name: 'Red Wine', nameZh: '红酒', emoji: '🍷', category: 'alcohol', color: 'bg-red-900 text-white', price: 15 },
  { id: 'white_wine', name: 'White Wine', nameZh: '白葡萄酒', emoji: '🥂', category: 'alcohol', color: 'bg-yellow-50', price: 15 },
  { id: 'champagne', name: 'Champagne', nameZh: '香槟', emoji: '🍾', category: 'alcohol', color: 'bg-yellow-100', price: 25 },
  { id: 'whiskey', name: 'Whiskey', nameZh: '威士忌', emoji: '🥃', category: 'alcohol', color: 'bg-amber-600 text-white', price: 18 },
  { id: 'bourbon', name: 'Bourbon', nameZh: '波本威士忌', emoji: '🥃', category: 'alcohol', color: 'bg-amber-700 text-white', price: 20 },
  { id: 'scotch', name: 'Scotch', nameZh: '苏格兰威士忌', emoji: '🥃', category: 'alcohol', color: 'bg-amber-800 text-white', price: 22 },
  { id: 'vodka', name: 'Vodka', nameZh: '伏特加', emoji: '🍸', category: 'alcohol', color: 'bg-slate-100', price: 12 },
  { id: 'sake', name: 'Sake', nameZh: '清酒', emoji: '🍶', category: 'alcohol', color: 'bg-white', price: 10 },
  { id: 'rum', name: 'Rum', nameZh: '朗姆酒', emoji: '🧉', category: 'alcohol', color: 'bg-amber-700 text-white', price: 14 },
  { id: 'gin', name: 'Gin', nameZh: '琴酒', emoji: '🌿', category: 'alcohol', color: 'bg-cyan-50', price: 14 },
  { id: 'tequila', name: 'Tequila', nameZh: '龙舌兰', emoji: '🌵', category: 'alcohol', color: 'bg-amber-100', price: 16 },
  { id: 'mezcal', name: 'Mezcal', nameZh: '梅斯卡尔', emoji: '🌵', category: 'alcohol', color: 'bg-stone-200', price: 18 },
  { id: 'brandy', name: 'Brandy', nameZh: '白兰地', emoji: '🍇', category: 'alcohol', color: 'bg-amber-800 text-white', price: 20 },
  { id: 'baijiu', name: 'Baijiu', nameZh: '白酒', emoji: '🍶', category: 'alcohol', color: 'bg-white', price: 25 },
  { id: 'soju', name: 'Soju', nameZh: '烧酒', emoji: '🍾', category: 'alcohol', color: 'bg-green-50', price: 8 },
  { id: 'vermouth_dry', name: 'Dry Vermouth', nameZh: '干味美思', emoji: '🍸', category: 'alcohol', color: 'bg-stone-50', price: 12 },
  { id: 'vermouth_sweet', name: 'Sweet Vermouth', nameZh: '甜味美思', emoji: '🍷', category: 'alcohol', color: 'bg-red-900 text-white', price: 12 },
  { id: 'triple_sec', name: 'Triple Sec', nameZh: '三重秒', emoji: '🍊', category: 'alcohol', color: 'bg-orange-50', price: 10 },
  { id: 'campari', name: 'Campari', nameZh: '金巴利', emoji: '🔴', category: 'alcohol', color: 'bg-red-600 text-white', price: 15 },
  { id: 'absinthe', name: 'Absinthe', nameZh: '苦艾酒', emoji: '🧚', category: 'alcohol', color: 'bg-green-200', price: 20 },
  { id: 'coffee_liqueur', name: 'Coffee Liqueur', nameZh: '咖啡利口酒', emoji: '☕', category: 'alcohol', color: 'bg-stone-900 text-white', price: 14 },
  { id: 'irish_cream', name: 'Irish Cream', nameZh: '爱尔兰奶油酒', emoji: '🥛', category: 'alcohol', color: 'bg-amber-100', price: 14 },
  { id: 'amaretto', name: 'Amaretto', nameZh: '杏仁酒', emoji: '🌰', category: 'alcohol', color: 'bg-amber-700 text-white', price: 15 },
];

export const SEASONINGS: Ingredient[] = [
  // Spices (Low Cost)
  { id: 'salt', name: 'Sea Salt', nameZh: '海盐', emoji: '🧂', category: 'spice', color: 'bg-white', price: 2 },
  { id: 'pepper', name: 'Black Pepper', nameZh: '黑胡椒', emoji: '⚫', category: 'spice', color: 'bg-stone-200', price: 3 },
  { id: 'msg', name: 'MSG', nameZh: '味精', emoji: '🧂', category: 'spice', color: 'bg-white', price: 2 },
  { id: 'sugar', name: 'Sugar', nameZh: '糖', emoji: '🍬', category: 'spice', color: 'bg-pink-50', price: 3 },
  { id: 'brown_sugar', name: 'Brown Sugar', nameZh: '红糖', emoji: '🏺', category: 'spice', color: 'bg-amber-700 text-white', price: 4 },
  { id: 'powdered_sugar', name: 'Powdered Sugar', nameZh: '糖粉', emoji: '🌨️', category: 'spice', color: 'bg-white', price: 4 },
  { id: 'honey', name: 'Honey', nameZh: '蜂蜜', emoji: '🍯', category: 'spice', color: 'bg-amber-300', price: 5 },
  { id: 'soysauce', name: 'Soy Sauce', nameZh: '酱油', emoji: '🍶', category: 'spice', color: 'bg-stone-800 text-white', price: 4 },
  { id: 'vinegar', name: 'Rice Vinegar', nameZh: '米醋', emoji: '🏺', category: 'spice', color: 'bg-stone-700 text-white', price: 4 },
  { id: 'cooking_wine', name: 'Cooking Wine', nameZh: '料酒', emoji: '🍾', category: 'spice', color: 'bg-amber-100', price: 4 },
  { id: 'oliveoil', name: 'Olive Oil', nameZh: '橄榄油', emoji: '🫒', category: 'spice', color: 'bg-yellow-100', price: 6 },
  { id: 'sesame_oil', name: 'Sesame Oil', nameZh: '芝麻油', emoji: '🪔', category: 'spice', color: 'bg-orange-100', price: 6 },
  { id: 'truffle_oil', name: 'Truffle Oil', nameZh: '松露油', emoji: '🫗', category: 'spice', color: 'bg-stone-800 text-white', price: 25 },
  { id: 'garlic', name: 'Garlic', nameZh: '大蒜', emoji: '🧄', category: 'spice', color: 'bg-stone-50', price: 3 },
  { id: 'ginger', name: 'Ginger', nameZh: '生姜', emoji: '🫚', category: 'spice', color: 'bg-amber-50', price: 3 },
  { id: 'chili', name: 'Hot Sauce', nameZh: '辣椒酱', emoji: '🔥', category: 'spice', color: 'bg-red-500 text-white', price: 5 },
  { id: 'wasabi', name: 'Wasabi', nameZh: '芥末', emoji: '🟢', category: 'spice', color: 'bg-green-500 text-white', price: 5 },
  { id: 'fresh_chili', name: 'Chili Pepper', nameZh: '辣椒', emoji: '🌶️', category: 'spice', color: 'bg-red-100', price: 4 },
  { id: 'herb', name: 'Fresh Herbs', nameZh: '香草', emoji: '🌿', category: 'spice', color: 'bg-green-100', price: 5 },
  { id: 'five_spice', name: 'Five Spice', nameZh: '五香粉', emoji: '🍂', category: 'spice', color: 'bg-stone-400', price: 4 },
  { id: 'curry_powder', name: 'Curry Powder', nameZh: '咖喱粉', emoji: '🍛', category: 'spice', color: 'bg-yellow-600 text-white', price: 4 },
  { id: 'cumin', name: 'Cumin', nameZh: '孜然', emoji: '🌿', category: 'spice', color: 'bg-amber-800 text-white', price: 4 },
  { id: 'saffron', name: 'Saffron', nameZh: '藏红花', emoji: '🌺', category: 'spice', color: 'bg-red-600 text-white', price: 50 },
  { id: 'gold_leaf', name: 'Gold Leaf', nameZh: '金箔', emoji: '✨', category: 'spice', color: 'bg-yellow-400', price: 200 },
  { id: 'lemon', name: 'Lemon', nameZh: '柠檬', emoji: '🍋', category: 'spice', color: 'bg-yellow-300', price: 4 },
  { id: 'lime', name: 'Lime', nameZh: '青柠', emoji: '🍋‍🟩', category: 'spice', color: 'bg-green-300', price: 4 },
  { id: 'butter', name: 'Butter', nameZh: '黄油', emoji: '🧈', category: 'spice', color: 'bg-yellow-200', price: 5 },
  { id: 'vanilla', name: 'Vanilla', nameZh: '香草精', emoji: '🌼', category: 'spice', color: 'bg-yellow-50', price: 6 },
  { id: 'cinnamon', name: 'Cinnamon', nameZh: '肉桂', emoji: '🪵', category: 'spice', color: 'bg-amber-700 text-white', price: 4 },
  { id: 'cocoa', name: 'Cocoa Powder', nameZh: '可可粉', emoji: '🟤', category: 'spice', color: 'bg-stone-600 text-white', price: 5 },
  { id: 'matcha', name: 'Matcha', nameZh: '抹茶粉', emoji: '🍵', category: 'spice', color: 'bg-green-600 text-white', price: 6 },
  { id: 'yeast', name: 'Yeast', nameZh: '酵母', emoji: '🫧', category: 'spice', color: 'bg-stone-100', price: 3 },
  { id: 'baking_powder', name: 'Baking Powder', nameZh: '泡打粉', emoji: '🥣', category: 'spice', color: 'bg-white', price: 3 },
  { id: 'baking_soda', name: 'Baking Soda', nameZh: '小苏打', emoji: '🧂', category: 'spice', color: 'bg-stone-50', price: 3 },
  { id: 'ice', name: 'Ice Cubes', nameZh: '冰块', emoji: '🧊', category: 'spice', color: 'bg-blue-100', price: 1 },
  { id: 'mint', name: 'Mint', nameZh: '薄荷', emoji: '🍃', category: 'spice', color: 'bg-green-200', price: 3 },
  { id: 'olive', name: 'Olive', nameZh: '橄榄', emoji: '🫒', category: 'spice', color: 'bg-green-700 text-white', price: 3 },
];

export const PREP_DETAILS = {
  [PrepMethod.CHOP]: { label: 'Chop', labelZh: '切碎', icon: Scissors, color: 'bg-stone-500' },
  [PrepMethod.BLEND]: { label: 'Blend', labelZh: '搅拌', icon: Zap, color: 'bg-purple-500' },
  [PrepMethod.AIR_DRY]: { label: 'Air Dry', labelZh: '风干', icon: Wind, color: 'bg-blue-400' },
  [PrepMethod.MARINATE]: { label: 'Marinate', labelZh: '腌制', icon: Droplets, color: 'bg-amber-600' },
};

export const HEAT_DETAILS = {
  [HeatMethod.BOIL]: { label: 'Boil', labelZh: '煮', icon: Waves, color: 'bg-blue-500' },
  [HeatMethod.FRY]: { label: 'Fry', labelZh: '煎/炸', icon: Flame, color: 'bg-orange-500' },
  [HeatMethod.BAKE]: { label: 'Bake', labelZh: '烘烤', icon: Thermometer, color: 'bg-red-600' },
};

export const MIX_DETAILS = {
  [MixMethod.SHAKE]: { label: 'Shake', labelZh: '摇匀', icon: Martini, color: 'bg-cyan-600' },
  [MixMethod.STIR]: { label: 'Stir', labelZh: '搅拌', icon: RotateCw, color: 'bg-purple-600' },
  [MixMethod.BUILD]: { label: 'Build', labelZh: '直调', icon: Layers, color: 'bg-amber-600' },
};

export const CUSTOMERS: Customer[] = [
  { id: '1', name: 'Grandma Rose', nameZh: '罗斯奶奶', emoji: '👵', trait: 'Traditional', traitZh: '传统', request: 'I want something warm and comforting, like a good soup.', requestZh: '我想吃点温暖舒适的东西，比如一碗好汤。', budget: 60 },
  { id: '2', name: 'Gym Bro Mike', nameZh: '健身哥迈克', emoji: '💪', trait: 'Fitness', traitZh: '健身狂', request: 'I need high protein! Meat and eggs, no sugar!', requestZh: '我需要高蛋白！肉和蛋，不要糖！', budget: 80 },
  { id: '3', name: 'Little Timmy', nameZh: '小提米', emoji: '👦', trait: 'Picky Eater', traitZh: '挑食', request: 'I want something sweet! No vegetables allowed!', requestZh: '我想吃甜的！不许放蔬菜！', budget: 40 },
  { id: '4', name: 'Critic Pierre', nameZh: '皮埃尔评论家', emoji: '🧐', trait: 'Gourmet', traitZh: '美食家', request: 'Surprise me with a perfectly baked dish. Keep it elegant.', requestZh: '用一道完美的烤菜给我惊喜。保持优雅。', budget: 100 },
  { id: '5', name: 'Spicy Sarah', nameZh: '辣妹莎拉', emoji: '🌶️', trait: 'Spice Lover', traitZh: '爱吃辣', request: 'Make it HOT! I want something spicy and fried.', requestZh: '做辣点！我想吃又辣又炸的东西。', budget: 55 },
  { id: '6', name: 'Vegan Val', nameZh: '素食者瓦尔', emoji: '🥗', trait: 'Vegan', traitZh: '纯素', request: 'No meat, no eggs, no dairy. Just plants, please.', requestZh: '不要肉，不要蛋，不要奶制品。只要植物，谢谢。', budget: 50 },
  { id: '7', name: 'Late Night Dan', nameZh: '夜猫子丹', emoji: '🥱', trait: 'Snacker', traitZh: '零食控', request: 'I need a greasy, salty late-night snack.', requestZh: '我需要一份油腻咸香的宵夜。', budget: 45 },
  { id: '8', name: 'Dr. Smoothie', nameZh: '思慕雪博士', emoji: '🥤', trait: 'Liquid Diet', traitZh: '流食', request: 'I have a toothache. Blend something soft for me.', requestZh: '我牙疼。给我打点软乎的东西。', budget: 40 },
  { id: '9', name: 'Raw Food Ray', nameZh: '生食雷', emoji: '🦁', trait: 'Paleo', traitZh: '原始人', request: 'Don\'t cook it! I want the ingredients fresh and raw.', requestZh: '别煮！我要新鲜生的食材。', budget: 70 },
  { id: '10', name: 'Chocoholic', nameZh: '巧克力控', emoji: '🍫', trait: 'Sweet Tooth', traitZh: '甜牙', request: 'If it doesn\'t have chocolate, I don\'t want it.', requestZh: '如果没有巧克力，我就不要。', budget: 50 },
  { id: '11', name: 'Richie Rich', nameZh: '富豪里奇', emoji: '🤑', trait: 'Extravagant', traitZh: '奢侈', request: 'I only eat the most expensive ingredients. Wagyu, Gold, Caviar!', requestZh: '我只吃最贵的食材。和牛、金箔、鱼子酱！', budget: 500 },
  { id: '12', name: 'Business Bob', nameZh: '商务鲍勃', emoji: '👔', trait: 'Stressed', traitZh: '压力大', request: 'I had a long day. I need a stiff drink.', requestZh: '今天累坏了。给我来杯烈的。', budget: 45 },
  { id: '13', name: 'Party Patty', nameZh: '派对帕蒂', emoji: '🥳', trait: 'Party Animal', traitZh: '派对动物', request: 'Something colorful and fun! Surprise me with a cocktail!', requestZh: '来点丰富多彩有趣的！给我调一杯惊喜鸡尾酒！', budget: 60 },
];

export const SPECIAL_CUSTOMERS: Customer[] = [
  // Bocchi the Rock
  { 
    id: 'bocchi', 
    name: 'Hitori Gotoh', 
    nameZh: '后藤一里', 
    emoji: '🎸', 
    trait: 'Socially Anxious', 
    traitZh: '社恐吉他手', 
    request: 'I... um... something soft... maybe a mango smoothie... ah, never mind...', 
    requestZh: '那个……嗯……软软的……比如芒果思慕雪……啊，没事……', 
    budget: 45, 
    suggestedIngredients: ['mango', 'yogurt', 'ice'] 
  },
  { 
    id: 'nijika', 
    name: 'Nijika Ijichi', 
    nameZh: '伊地知虹夏', 
    emoji: '🥁', 
    trait: 'Energetic Angel', 
    traitZh: '下北泽大天使', 
    request: 'Something energizing for the band practice! Maybe with corn?', 
    requestZh: '给乐队练习补充能量！来点有玉米的？', 
    budget: 55, 
    suggestedIngredients: ['corn', 'cheese', 'butter'] 
  },
  { 
    id: 'ryo', 
    name: 'Ryo Yamada', 
    nameZh: '山田凉', 
    emoji: '🌿', 
    trait: 'Broke Bassist', 
    traitZh: '屑凉', 
    request: 'I spent all my money on gear. Feed me weeds... or something cheap.', 
    requestZh: '钱都拿去买贝斯了。给我吃草……或者便宜的东西。', 
    budget: 15, 
    suggestedIngredients: ['herb', 'water', 'spinach'] 
  },
  { 
    id: 'kita', 
    name: 'Ikuyo Kita', 
    nameZh: '喜多郁代', 
    emoji: '✨', 
    trait: 'Kita-Aura', 
    traitZh: '现充光环', 
    request: 'Make me the most instagrammable dessert ever! So shiny and cute!', 
    requestZh: '给我做个最适合发Ins的甜点！要闪闪发光那种！', 
    budget: 85, 
    suggestedIngredients: ['strawberry', 'cream', 'powdered_sugar', 'soda_water'] 
  },
  // Demon Slayer
  { 
    id: 'tanjiro', 
    name: 'Tanjiro', 
    nameZh: '炭治郎', 
    emoji: '🌊', 
    trait: 'Demon Slayer', 
    traitZh: '鬼杀队剑士', 
    request: 'I need strength to protect everyone! A hearty rice ball or soup!', 
    requestZh: '我需要力量保护大家！请给我饭团或者热汤！', 
    budget: 40, 
    suggestedIngredients: ['rice', 'spinach', 'salmon'] 
  },
  { 
    id: 'nezuko', 
    name: 'Nezuko', 
    nameZh: '祢豆子', 
    emoji: '🎋', 
    trait: 'Demon Sister', 
    traitZh: '鬼之妹', 
    request: 'Mmm! Mmm! (Stares intensely at the bread)', 
    requestZh: '唔！唔！（盯着面包看）', 
    budget: 35, 
    suggestedIngredients: ['bread', 'milk'] 
  },
  { 
    id: 'zenitsu', 
    name: 'Zenitsu', 
    nameZh: '善逸', 
    emoji: '⚡', 
    trait: 'Thunder Breather', 
    traitZh: '雷之呼吸', 
    request: 'Nezuko-chan!!! Give me something sweet to share with her!', 
    requestZh: '祢豆子酱！！！给我点甜的，我要跟她分享！', 
    budget: 60, 
    suggestedIngredients: ['honey', 'lemon', 'sugar'] 
  },
  { 
    id: 'inosuke', 
    name: 'Inosuke', 
    nameZh: '伊之助', 
    emoji: '🐗', 
    trait: 'Beast Breathing', 
    traitZh: '猪突猛进', 
    request: 'TEMPURA!! FRY IT!! FRY EVERYTHING!!', 
    requestZh: '天妇罗！！炸！全都给我炸了！！', 
    budget: 70, 
    suggestedIngredients: ['shrimp', 'flour', 'oliveoil'] 
  },
  { 
    id: 'rengoku', 
    name: 'Rengoku', 
    nameZh: '杏寿郎', 
    emoji: '🔥', 
    trait: 'Flame Hashira', 
    traitZh: '炎柱', 
    request: 'UMAI! Give me something fiery and delicious! Sweet potatoes!', 
    requestZh: '好吃！给我来点火辣美味的！红薯！', 
    budget: 100, 
    suggestedIngredients: ['potato', 'butter', 'sugar', 'fresh_chili'] 
  }
];
