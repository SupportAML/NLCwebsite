// Captures ?src= (or ?utm_source=) once per session and remembers it across the
// SPA's client-side routing, so a lead landing on /?src=linkedin who then
// clicks around before submitting the contact form still gets tagged.
const STORAGE_KEY = 'nlc_lead_source';

export function captureSource() {
  const params = new URLSearchParams(window.location.search);
  const src = params.get('src') || params.get('utm_source');
  if (src) {
    sessionStorage.setItem(STORAGE_KEY, src.toLowerCase());
  }
}

export function getStoredSource(): string {
  return sessionStorage.getItem(STORAGE_KEY) || '';
}
