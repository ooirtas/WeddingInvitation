import { json } from '@sveltejs/kit';
import { siteConfig } from '$lib/data/site';
import { env } from '$env/dynamic/private';

export async function POST({ request, fetch }) {
  const endpoint = env.PUBLIC_GAS_RSVP_ENDPOINT || siteConfig.appScriptEndpoint;

  if (!endpoint) {
    return json(
      { ok: false, message: 'Google Apps Script endpoint belum dikonfigurasi.' },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();

    const form = new URLSearchParams({
      timestamp: new Date().toISOString(),
      name: payload.name || '',
      attendance: payload.attendance || '',
      guestCount: String(payload.guestCount || ''),
      message: payload.message || ''
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      body: form,
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      redirect: 'follow'
    });

    if (!response.ok) {
      return json(
        { ok: false, message: `Apps Script merespons ${response.status}.` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    const result = contentType.includes('application/json')
      ? await response.json().catch(() => ({ ok: true }))
      : await response.text().catch(() => 'ok');

    return json({ ok: true, result });
  } catch (error) {
    return json(
      {
        ok: false,
        message: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim RSVP.'
      },
      { status: 500 }
    );
  }
}
