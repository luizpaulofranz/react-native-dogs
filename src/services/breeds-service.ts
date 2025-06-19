import { Breed } from '../types/breed';
import { apiFetch } from './http-client';

export async function fetchBreeds(): Promise<Breed[]> {
    const response = await apiFetch('breeds/list/all');
    const data = await response.json();
    return Object.keys(data.message).map(breed => Breed(breed));
}

export async function getBreedImages(breedName: string): Promise<string[]> {
    const response = await apiFetch(`breed/${breedName.toLowerCase()}/images`);
    const data = await response.json();
    return data.message;
} 