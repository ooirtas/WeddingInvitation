import { browser } from '$app/environment';
const STORAGE_PREFIX = 'wedding-rsvp';

function createSubmissionKey(payload) {
  const safeName = payload.name.toLowerCase().replace(/\s+/g, '-');
  return `${STORAGE_PREFIX}:${safeName}`;
}

export function hasRecentSubmission(payload) {
  if (!browser) {
    return false;
  }

  const key = createSubmissionKey(payload);
  const raw = localStorage.getItem(key);
  if (!raw) {
    return false;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) && Date.now() - parsed < 1000 * 60 * 15;
}

export function markSubmission(payload) {
  if (!browser) {
    return;
  }

  localStorage.setItem(createSubmissionKey(payload), `${Date.now()}`);
}

export async function submitRsvp(payload) {
  const response = await fetch('/api/rsvp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Gagal mengirim RSVP. Silakan coba lagi.');
  }

  return response.json().catch(() => ({ ok: true }));
}
