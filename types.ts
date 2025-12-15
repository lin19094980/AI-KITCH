

export type Language = 'en' | 'zh';
export type Theme = 'default' | 'japanese';

export interface Ingredient {
  id: string;
  name: string;
  nameZh?: string;
  emoji: string;
  category: 'protein' | 'vegetable' | 'starch' | 'misc' | 'spice' | 'alcohol';
  color: string;
  price: number;
}

export type ItemStatus = 'raw' | 'chopped' | 'blended' | 'marinated' | 'dried' | 'burnt' | 'undercooked' | 'shaken' | 'stirred';

export interface KitchenItem extends Ingredient {
  instanceId: string;
  status: ItemStatus;
  marinadeLabels?: string[];
}

export enum PrepMethod {
  CHOP = 'CHOP',
  BLEND = 'BLEND',
  MARINATE = 'MARINATE',
  AIR_DRY = 'AIR_DRY'
}

export enum HeatMethod {
  BOIL = 'BOIL',
  FRY = 'FRY',
  BAKE = 'BAKE'
}

export enum MixMethod {
  SHAKE = 'SHAKE',
  STIR = 'STIR',
  BUILD = 'BUILD'
}

export type AnyCookingMethod = PrepMethod | HeatMethod | MixMethod;

export type GameMode = 'SANDBOX' | 'CHALLENGE';

export type CookingPrecision = 'undercooked' | 'perfect' | 'burnt';

export interface Customer {
  id: string;
  name: string;
  nameZh?: string;
  emoji: string;
  request: string; // e.g., "I want something spicy and crunchy"
  requestZh?: string;
  trait: string; // For flavor text logic, e.g., "Health Nut", "Sweet Tooth"
  traitZh?: string;
  budget: number; // The base offer calculated from implicit recipe
  suggestedIngredients?: string[]; // IDs of ingredients for the implicit recipe
}

export interface DishIngredient {
  name: string;
  emoji: string;
  status?: string;
  marinade?: string;
}

export interface DishResult {
  dishName: string;
  description: string;
  emoji: string;
  score: number; // 0-100
  chefComment: string;
  colorHex: string; // Visual theme for the result
  imageUrl?: string; // Generated image of the dish
  customerFeedback?: string; // Specific feedback regarding the request (Optional for Sandbox)
  customerSatisfied?: boolean; // Did we meet the requirement? (Optional for Sandbox)
  customerName?: string; // For history logs
  customerEmoji?: string; // For history logs
  ingredients?: DishIngredient[]; // List of ingredients used
  
  // Financials
  cost?: number;
  revenue?: number;
  profit?: number;
  latePenalty?: number; // New field for time penalty
  
  // Precision metadata
  cookingPrecision?: CookingPrecision;
}

export interface GameState {
  counterItems: KitchenItem[];
  prepItems: KitchenItem[];
  potItems: KitchenItem[];
  barItems: KitchenItem[];
  isCooking: boolean;
  lastResult: DishResult | null;
  history: DishResult[];
  currentCustomer: Customer | null;
  money: number;
}