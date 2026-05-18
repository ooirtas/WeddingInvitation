export function normalizeGuestName(name) {
  return (name || '').trim().replace(/\+/g, ' ') || 'Bapak/Ibu/Saudara/i';
}

export function buildInvitationLink(baseDomain, guestName) {
  const base = (baseDomain || '').replace(/\/$/, '');
  return `${base}/invite?to=${encodeURIComponent(guestName.trim())}`;
}

export function buildWhatsappMessage(baseDomain, guestName, coupleNames) {
  const link = buildInvitationLink(baseDomain, guestName);

  return `${[
    '═══════════════ ❀ ❀ ❀ ═══════════════',
    'Assalamu’alaikum Warahmatullahi Wabarakatuh.',
    '',
    `Dengan hormat kami mengundang *${guestName}* untuk hadir di acara pernikahan kami.`,
    '',
    `*${coupleNames}*`,
    '',
    'Buka undangan untuk info lengkap dari acara bisa mengunjungi link berikut:',
    link,
    '',
    'Atas perhatian dan kehadirannya, kami mengucapkan terima kasih.',
    'Wassalamu’alaikum Warahmatullahi Wabarakatuh.',
  ].join('\n')}`;
}

export function buildWhatsappDeepLink(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
