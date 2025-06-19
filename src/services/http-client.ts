// this is the http client, here we can add generic configurations for the app
// like headers, interceptros, etc

const API_URL = 'https://dog.ceo/api/';

export async function apiFetch(path: string): Promise<Response> {
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok) throw new Error('API error');
    return res;
} 