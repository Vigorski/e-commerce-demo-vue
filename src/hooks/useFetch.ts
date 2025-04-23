type optionsType<TBody> = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: TBody;
};

export async function useFetch<TResponse, TBody>(
  url: string,
  options?: optionsType<TBody>
): Promise<TResponse> {
  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    return await response.json();
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
