import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Breed } from '../types/breed';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Breed[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    async function loadFavorites() {
        try {
            const stored = await AsyncStorage.getItem('favorites');
            const parsed = stored ? JSON.parse(stored) : [];
            setFavorites(parsed);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function toggleFavorite(breed: Breed) {
        const newFavorites = favorites.some(b => b.name === breed.name)
            ? favorites.filter(b => b.name !== breed.name)
            : [...favorites, breed];

        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            setFavorites(newFavorites);
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }


    return {
        favorites,
        isLoading,
        toggleFavorite,
        loadFavorites
    };
} 