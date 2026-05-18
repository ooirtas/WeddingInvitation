import { normalizeGuestName } from '$lib/utils/invitation';

export function load({ url }) {
  return {
    guestName: normalizeGuestName(url.searchParams.get('to') || url.searchParams.get('guest') || '')
  };
}
