

import { GoogleGenAI, Type } from "@google/genai";
import { KitchenItem, PrepMethod, HeatMethod, MixMethod, DishResult, Customer, Language, CookingPrecision, AnyCookingMethod } from '../types';
import { INGREDIENTS, SEASONINGS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// All valid IDs for checking
const ALL_INGREDIENTS = [...INGREDIENTS, ...SEASONINGS];
const VALID_IDS = ALL_INGREDIENTS.map(i => i.id);

// Helper to get visual description based on method
const getVisualPrompt = (items: KitchenItem[], method: AnyCookingMethod | null, precision?: CookingPrecision): string => {
  let description = "Ingredients: ";
  
  items.forEach(item => {
    description += `${item.status} ${item.name}`;
    if (item.marinadeLabels && item.marinadeLabels.length > 0) {
        description += ` (seasoned with ${item.marinadeLabels.join(', ')})`;
    }
    description += ", ";
  });

  // Cooking Textures
  if (method === HeatMethod.BOIL) description += "boiled in liquid, wet, soup-like, soft, steaming. ";
  else if (method === HeatMethod.FRY) description += "pan-fried, oily, seared, crispy edges, browned. ";
  else if (method === HeatMethod.BAKE) description += "oven-baked, roasted, dry heat texture, golden brown. ";
  
  // Mix Textures
  else if (method === MixMethod.SHAKE) description += "cocktail, foamy, icy, chilled, mixed liquid, elegant glass. ";
  else if (method === MixMethod.STIR) description += "cocktail, clear liquid, stirred with ice, smooth, glass. ";
  else if (method === MixMethod.BUILD) description += "layered drink, highball glass, ice cubes, distinct layers or bubbles. ";
  
  else description += "raw, uncooked, fresh. ";

  // Precision Visuals
  if (precision === 'burnt') {
      description += "APPEARANCE IS BURNT, CHARRED, BLACKENED, OVERCOOKED, DRY, SMOKY. ";
  } else if (precision === 'undercooked') {
      description += "APPEARANCE IS UNDERCOOKED, RAW IN MIDDLE, PALE, WATERY. ";
  } else if (precision === 'perfect') {
      description += "COOKED TO PERFECTION, GOLDEN BROWN, JUICY, APPETIZING. ";
  }

  return description;
};

export const generateCustomer = async (lang: Language, template?: Customer): Promise<Customer> => {
  const isZh = lang === 'zh';
  const languageInstruction = isZh ? "Generate the response in Simplified Chinese." : "Generate the response in English.";
  
  // Rule for mutually exclusive food/drink
  const exclusiveRule = "CRITICAL REQUIREMENT: The request must be EITHER for a food dish OR for a drink/cocktail. NEVER ask for both in the same order. Choose one category only.";

  let prompt = "";
  let responseSchema;

  if (template) {
     // Specific Character Generation
     const name = isZh ? (template.nameZh || template.name) : template.name;
     const trait = isZh ? (template.traitZh || template.trait) : template.trait;
     
     prompt = `
        Roleplay as a specific character visiting a restaurant.
        ${languageInstruction}
        
        Character Profile:
        Name: ${name}
        Trait/Personality: ${trait}
        
        Task:
        1. Generate a request (dialogue) in the first person voice of this character.
           - ${exclusiveRule}
           - Reflect their personality (e.g. catchphrases, tone, lore).
        2. Select 3 to 5 ingredient IDs that match this request.
           Valid IDs: ${VALID_IDS.join(', ')}
    `;

    responseSchema = {
        type: Type.OBJECT,
        properties: {
          request: { type: Type.STRING },
          suggestedIngredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
          }
        },
        required: ["request", "suggestedIngredients"],
    };

  } else {
    // Random Generation
    prompt = `
        Generate a fictional restaurant/bar customer for a cooking game.
        ${languageInstruction}
        
        Requirements:
        1. Name: A creative name.
        2. Emoji: An emoji that represents them.
        3. Trait: A short personality trait.
        4. Request: A specific food OR DRINK request in the first person. 
           - ${exclusiveRule}
           - Make it fun!
        5. Suggested Ingredients: Select 3 to 5 ingredient IDs.
           Valid IDs: ${VALID_IDS.join(', ')}
    `;

    responseSchema = {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        emoji: { type: Type.STRING },
        trait: { type: Type.STRING },
        request: { type: Type.STRING },
        suggestedIngredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
      },
      required: ["name", "emoji", "trait", "request", "suggestedIngredients"],
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    const data = JSON.parse(text);

    // Calculate Budget
    let totalCost = 0;
    const suggestedIds = data.suggestedIngredients || [];
    
    suggestedIds.forEach((id: string) => {
        const item = ALL_INGREDIENTS.find(i => i.id === id);
        if (item) {
            totalCost += item.price;
        }
    });

    if (totalCost === 0) totalCost = 30;
    const budget = Math.round(totalCost * 1.5); 

    if (template) {
        return {
            ...template,
            request: data.request,
            requestZh: undefined, // Clear static translation to ensure dynamic request is displayed
            suggestedIngredients: suggestedIds,
            budget: budget
        };
    } else {
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            emoji: data.emoji,
            trait: data.trait,
            request: data.request,
            budget: budget,
            suggestedIngredients: suggestedIds
        };
    }
  } catch (error) {
    console.error("Failed to generate customer:", error);
    if (template) return template; // Fallback to hardcoded template
    
    return {
      id: 'fallback',
      name: isZh ? '饥饿的访客' : 'Hungry Visitor',
      emoji: '🙂',
      trait: isZh ? '急躁' : 'Impatient',
      request: isZh ? '随便做点能吃的就行。' : 'Just make me something edible, please.',
      budget: 50,
      suggestedIngredients: ['bread', 'cheese']
    };
  }
};

export const cookDish = async (
  items: KitchenItem[],
  method: AnyCookingMethod | null,
  customer: Customer | null,
  lang: Language,
  precision: CookingPrecision = 'perfect'
): Promise<DishResult> => {
  const itemList = items.map(i => {
     let desc = `${i.status.toUpperCase()} ${i.name}`;
     if (i.marinadeLabels && i.marinadeLabels.length > 0) {
         desc += ` (Seasoned/Marinated with: ${i.marinadeLabels.join(', ')})`;
     }
     return desc;
  }).join(', ');
  
  const hasCustomer = !!customer;
  const isZh = lang === 'zh';
  const languageInstruction = isZh ? "OUTPUT IN SIMPLIFIED CHINESE (Simplified Chinese characters for all text fields)." : "OUTPUT IN ENGLISH.";

  // Determine Persona based on Method
  const isBartending = method === MixMethod.SHAKE || method === MixMethod.STIR || method === MixMethod.BUILD;
  
  // Cooking Precision Logic Text for Prompt
  let precisionText = "";
  if (precision === 'burnt') {
      precisionText = "EXECUTION STATUS: BURNT. The food was cooked too long. It is charred, dry, and bitter. Score limit: 40 (unless intentional charred dish).";
  } else if (precision === 'undercooked') {
      precisionText = "EXECUTION STATUS: UNDERCOOKED. The food was not cooked long enough. If meat/poultry, it is dangerous (Score < 30). If veg, it is raw/crunchy.";
  } else {
      precisionText = "EXECUTION STATUS: PERFECT. Technical execution is flawless. Judge based on ingredient harmony.";
  }

  // Ingredient List for history
  const ingredientList = items.map(i => ({
      name: isZh ? (i.nameZh || i.name) : i.name,
      emoji: i.emoji,
      status: i.status !== 'raw' ? i.status : undefined,
      marinade: (i.marinadeLabels && i.marinadeLabels.length > 0) 
        ? i.marinadeLabels.join(', ') 
        : undefined
  }));

  const textPrompt = `
    Roleplay as a ${isBartending ? 'Master Mixologist' : 'Executive Chef'} with a personality that is witty, observant, and strictly realistic about flavors (like Gordon Ramsay but funnier).
    
    CONTEXT:
    ${hasCustomer ? `
    CUSTOMER: "${customer?.name}" (${customer?.trait})
    REQUEST: "${customer?.request}"
    ` : `
    MODE: Sandbox (Creative Freedom).
    `}
    
    INPUTS:
    Ingredients: ${itemList}
    Method: ${method ? method : 'None (Served Raw/Cold)'}
    Technical Result: ${precisionText}
    
    SCORING GUIDELINES (0-100):
    *Avoid generic scores. Use the full spectrum.*
    
    - **0-25 (Disaster)**: Inedible, dangerous (raw chicken), or repulsive (milk + lemon).
    - **26-50 (Failure)**: Edible but bad. Conflicting flavors, poor texture, or missing customer requirement.
    - **51-70 (Average)**: Safe, boring, or "it works I guess". Home-cook level.
    - **71-85 (Great)**: Delicious, good balance, professional quality.
    - **86-95 (Excellent)**: Impressive creativity, perfect execution, delighted customer.
    - **96-100 (Legendary)**: Flawless masterpiece. Rare.
    
    EVALUATION RULES:
    1. **Food Safety**: Raw meat/starch without heat is a health hazard. Automatic low score (<30).
    2. **Flavor Logic**: Be realistic. Does A really go with B? (e.g. Fish + Chocolate = Gross).
    3. **Customer Satisfaction**: If the customer specifically asked for X and didn't get it, cap the score at 60.
    
    OUTPUT TASKS:
    1. **Dish Name**: A creative name for the result.
    2. **Score**: Number 0-100.
    3. **Description**: 1-2 sentences on taste/texture.
    4. **Chef/Bartender Comment**: A natural, human-like comment. 
       - If bad: Be sarcastic/witty roast (e.g., "This is a crime against flavor.").
       - If good: Be genuinely impressed or creatively descriptive.
       - *Reference specific ingredients used.*
    5. **Customer Feedback**: Speak in the character's voice.
    6. **Emoji & Color**: Visual theme.

    ${languageInstruction}
  `;

  try {
    const textResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: textPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dishName: { type: Type.STRING },
            description: { type: Type.STRING },
            emoji: { type: Type.STRING },
            score: { type: Type.NUMBER },
            chefComment: { type: Type.STRING, description: "A witty or critical comment" },
            customerFeedback: { type: Type.STRING },
            customerSatisfied: { type: Type.BOOLEAN },
            colorHex: { type: Type.STRING },
          },
          required: ["dishName", "description", "emoji", "score", "chefComment", "customerFeedback", "customerSatisfied", "colorHex"],
        }
      }
    });

    const text = textResponse.text;
    if (!text) throw new Error("No text response from AI");
    const resultJson = JSON.parse(text) as DishResult;

    // Image Generation
    let aesthetic = "";
    if (precision === 'burnt' || resultJson.score < 35) {
      aesthetic = "messy, ugly, disastrous, gross, bad lighting.";
    } else if (resultJson.score < 75) {
      aesthetic = "simple, amateur, realistic.";
    } else {
      aesthetic = `professional ${isBartending ? 'cocktail photography, bar lighting, glowing, elegant glass, garnish' : 'food photography, studio lighting, delicious, garnish'}.`;
    }

    const visualDesc = getVisualPrompt(items, method, precision);

    const imagePrompt = `
      A realistic photo of ${isBartending ? 'a drink' : 'a dish'} named "${resultJson.dishName}".
      
      STRICT CONTENTS:
      - Ingredients: ${itemList}.
      
      VISUALS:
      - ${visualDesc}

      VIBE:
      - ${resultJson.description}.
      - Visual Style: ${aesthetic}
      
      View: ${isBartending ? 'Front view of the glass on a bar counter.' : '45-degree angle close-up.'}
    `;

    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: imagePrompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3"
        }
      }
    });

    let imageUrl = undefined;
    for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    return {
      ...resultJson,
      imageUrl,
      customerName: customer?.name,
      customerEmoji: customer?.emoji,
      ingredients: ingredientList,
      cookingPrecision: precision
    };

  } catch (error) {
    console.error("Cooking failed:", error);
    return {
      dishName: isZh ? "厨房错误" : "Kitchen Error",
      description: isZh ? "网络错误。" : "Network error.",
      emoji: "💥",
      score: 0,
      chefComment: isZh ? "技术故障。" : "Technical difficulties.",
      colorHex: "#57534e",
      customerFeedback: "...",
      customerSatisfied: false,
      ingredients: []
    };
  }
};
