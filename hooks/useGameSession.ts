import { useState, useEffect } from 'react';
import { GameMode, Theme, Language } from '../types';
import { audioService } from '../services/audioService';

const DAY_LENGTH = 600; // 10 Minutes
const RENT_COST = 100;

export const useGameSession = () => {
    const [gameMode, setGameMode] = useState<GameMode | null>(null);
    const [money, setMoney] = useState(200);
    const [day, setDay] = useState(1);
    const [dayTimeLeft, setDayTimeLeft] = useState(DAY_LENGTH);
    const [dailyRevenue, setDailyRevenue] = useState(0);
    const [showDaySummary, setShowDaySummary] = useState(false);
    const [showGameOver, setShowGameOver] = useState(false);
    
    // Settings state
    const [language, setLanguage] = useState<Language>('zh');
    const [theme, setTheme] = useState<Theme>('default');

    // Initialize Settings
    useEffect(() => {
        const savedTheme = localStorage.getItem('ai-pocket-kitchen-theme');
        if (savedTheme === 'japanese' || savedTheme === 'default') {
            setTheme(savedTheme as Theme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ai-pocket-kitchen-theme', theme);
    }, [theme]);

    // Reset session when entering Challenge Mode
    useEffect(() => {
        if (gameMode === 'CHALLENGE') {
            setMoney(200);
            setDay(1);
            setDayTimeLeft(DAY_LENGTH);
            setDailyRevenue(0);
            setShowDaySummary(false);
            setShowGameOver(false);
        }
    }, [gameMode]);

    // Day Timer
    useEffect(() => {
        if (gameMode !== 'CHALLENGE' || showDaySummary || showGameOver) return;
        const timer = setInterval(() => {
            setDayTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    audioService.playSuccess();
                    setShowDaySummary(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [gameMode, showDaySummary, showGameOver]);

    const handleTransaction = (amount: number) => {
        setMoney(prev => prev + amount);
        if (amount > 0) setDailyRevenue(prev => prev + amount);
    };

    const startNextDay = () => {
        const newBalance = money - RENT_COST;
        if (newBalance < 0) {
            setShowGameOver(true);
            setShowDaySummary(false);
        } else {
            setMoney(newBalance);
            setDay(d => d + 1);
            setDayTimeLeft(DAY_LENGTH);
            setDailyRevenue(0);
            setShowDaySummary(false);
        }
    };

    return {
        gameMode, setGameMode,
        money, setMoney,
        day, dayTimeLeft, dailyRevenue,
        showDaySummary, setShowDaySummary,
        showGameOver, setShowGameOver,
        handleTransaction,
        startNextDay,
        language, setLanguage,
        theme, setTheme,
        RENT_COST, DAY_LENGTH
    };
};