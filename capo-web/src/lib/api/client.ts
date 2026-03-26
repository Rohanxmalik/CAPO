const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  meta: {
    requestId: string;
    timestamp: string;
    pagination?: {
      total: number;
      page: number;
      limit: number;
      hasMore: boolean;
    };
  };
}

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<ApiEnvelope<T>> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const envelope: ApiEnvelope<T> = await res.json();

  if (!envelope.success) {
    throw new Error(envelope.error ?? `API error: ${res.status}`);
  }

  return envelope;
}

export const api = {
  get: <T>(path: string) => request<T>(path),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
};
