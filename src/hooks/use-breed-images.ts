import { useEffect, useState } from 'react';
import { getBreedImages } from '../services/breeds-service';

export function useBreedImages(breedName: string) {
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchBreedImages() {
            try {
                setIsLoading(true);
                setError(null);
                const images = await getBreedImages(breedName);
                setImages(images);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch breed images'));
            } finally {
                setIsLoading(false);
            }
        }
        fetchBreedImages();
    }, [breedName]);

    return { images, isLoading, error };
} 