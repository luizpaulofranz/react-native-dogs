export interface Breed {
    name: string;
}

export function Breed(name: string): Breed {
    return {
        name,
    };
}