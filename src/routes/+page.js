import { redirect } from '@sveltejs/kit';

export function load({ url }) {
  const search = url.searchParams.toString();
  throw redirect(307, `/invite${search ? `?${search}` : ''}`);
}
