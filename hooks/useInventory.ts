import { useState } from 'react';
import { KitchenItem, Ingredient } from '../types';
import { audioService } from '../services/audioService';

export const useInventory = () => {
  const [counterItems, setCounterItems] = useState<KitchenItem[]>([]);
  const [prepItems, setPrepItems] = useState<KitchenItem[]>([]);
  const [marinateItems, setMarinateItems] = useState<KitchenItem[]>([]);
  const [potItems, setPotItems] = useState<KitchenItem[]>([]);
  const [barItems, setBarItems] = useState<KitchenItem[]>([]);

  const spawnItem = (ingredient: Ingredient) => {
    const newItem: KitchenItem = {
      ...ingredient,
      instanceId: Math.random().toString(36).substr(2, 9),
      status: 'raw'
    };
    audioService.playPop();
    setCounterItems(prev => [...prev, newItem]);
  };

  const removeItemFromCounter = (item: KitchenItem) => {
      setCounterItems(prev => prev.filter(i => i.instanceId !== item.instanceId));
  };

  const moveItemToStation = (item: KitchenItem, station: 'PREP' | 'MARINATE' | 'COOK' | 'BAR') => {
      if (station === 'PREP' && prepItems.length < 20) {
          removeItemFromCounter(item);
          setPrepItems(prev => [...prev, item]);
      } else if (station === 'MARINATE' && marinateItems.length < 20) {
          removeItemFromCounter(item);
          setMarinateItems(prev => [...prev, item]);
      } else if (station === 'BAR' && barItems.length < 20) {
          removeItemFromCounter(item);
          setBarItems(prev => [...prev, item]);
      } else if (station === 'COOK' && potItems.length < 20) {
          removeItemFromCounter(item);
          setPotItems(prev => [...prev, item]);
      }
      audioService.playClick();
  };

  const returnItemToCounter = (item: KitchenItem, from: 'PREP' | 'MARINATE' | 'COOK' | 'BAR') => {
      if (from === 'PREP') setPrepItems(prev => prev.filter(i => i.instanceId !== item.instanceId));
      else if (from === 'MARINATE') setMarinateItems(prev => prev.filter(i => i.instanceId !== item.instanceId));
      else if (from === 'BAR') setBarItems(prev => prev.filter(i => i.instanceId !== item.instanceId));
      else setPotItems(prev => prev.filter(i => i.instanceId !== item.instanceId));
      
      setCounterItems(prev => [...prev, item]);
      audioService.playDelete();
  };

  const updatePrepItems = (newItems: KitchenItem[]) => {
      setCounterItems(prev => [...prev, ...newItems]);
      setPrepItems([]);
  };

  const updateMarinateItems = (newItems: KitchenItem[]) => {
      setCounterItems(prev => [...prev, ...newItems]);
      setMarinateItems([]);
  };

  const clearCookingStations = () => {
      setPotItems([]);
      setBarItems([]);
  };

  return {
      counterItems, setCounterItems,
      prepItems, setPrepItems,
      marinateItems, setMarinateItems,
      potItems, setPotItems,
      barItems, setBarItems,
      spawnItem,
      removeItemFromCounter,
      moveItemToStation,
      returnItemToCounter,
      updatePrepItems,
      updateMarinateItems,
      clearCookingStations
  };
};