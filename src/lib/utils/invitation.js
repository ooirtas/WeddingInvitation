import { siteConfig } from "$lib/data/site";

export function normalizeGuestName(name) {
  return (name || '').trim().replace(/\+/g, ' ') || 'Bapak/Ibu/Saudara/i';
}

export function buildInvitationLink(baseDomain, guestName) {
  const base = (baseDomain || '').replace(/\/$/, '');
  return `${base}/renni-reza?to=${encodeURIComponent(guestName.trim())}`;
}

export function buildWhatsappMessage(baseDomain, guestName) {
  const link = buildInvitationLink(baseDomain, guestName);

  return `${[
    '════════ ❀ ❀ ❀ ════════',
    'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    '',
    `Dengan hormat kami mengundang Bapak/Ibu/Saudara/i:`,
    `*${guestName}*`,
    `untuk hadir di acara pernikahan kami:`,
    '',
    `*${siteConfig.bride.full}*`,
    `_${siteConfig.bride.parents}_`,
    '',
    `&`,
    '',
    `*${siteConfig.groom.full}*`,
    `_${siteConfig.groom.parents}_`,
    '',
    'Buka tautan undangan berikut untuk info detail acara:',
    link,
    '',
    'Atas perhatian dan kehadirannya, kami mengucapkan terima kasih.',
    'Wassalamu’alaikum Warahmatullahi Wabarakatuh',
  ].join('\n')}`;
}

export function buildWhatsappDeepLink(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function buildResepsiInvitationLink(baseDomain, guestName) {
  const base = (baseDomain || '').replace(/\/$/, '');
  return `${base}/renni-reza?kepada=${encodeURIComponent(guestName.trim())}`;
}

export function buildResepsiWhatsappMessage(baseDomain, guestName) {
  const link = buildResepsiInvitationLink(baseDomain, guestName);

  return `*Assalamu'alaikum Wr. Wb*
 
Kepada Yth.
${guestName}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara Resepsi Pernikahan kami pada:

🗓️ *Minggu, 14 Juni 2026*
🕙 *11.00 - 13.00 WIB*
📍 *Auditorium Giri S. Hadihardjono STTD*

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi.

_${link}_

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Kami yang berbahagia,
Renni & Reza

*Wassalamualaikum Wr. Wb*`;
}
