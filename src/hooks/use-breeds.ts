import { useEffect, useState } from 'react';
import { fetchBreeds } from '../services/breeds-service';
import { Breed } from '../types/breed';

export function useBreeds() {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        setIsLoading(true);
        fetchBreeds()
            .then((data: Breed[]) => {
                const breeds = data.map(breed => ({
                    ...breed,
                    name: breed.name.charAt(0).toUpperCase() + breed.name.slice(1)
                }));
                setBreeds(breeds);
                setIsLoading(false);
            })
            .catch(e => {
                setError(e);
                setIsLoading(false);
            });
    }, []);

    return { breeds, isLoading, error };
} 