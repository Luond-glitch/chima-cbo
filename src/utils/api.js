// Tiny helper for the CHIMA mail server (see /server). In dev, Vite proxies /api to it.
const BASE = import.meta.env.VITE_API_URL || '';

export async function postForm(path, data) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error('Could not reach the server. Please check your connection or email us directly at info@chima.org.');
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
  return json;
}
