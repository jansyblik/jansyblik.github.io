// Základní údaje webu. Tady se mění kontakty a napojení na služby.
export const site = {
  url: 'https://jansyblik.cz',
  name: 'Jan Syblík',
  role: 'realitní makléř',
  title: 'Jan Syblík – realitní makléř | Berounsko, Praha a Kladno',
  description:
    'Jan Syblík, realitní makléř spolupracující s realitní kanceláří Domov Beroun. Prodám váš byt, dům nebo pozemek v Berouně, Kladně, Praze a na Hořovicku rychle a bez starostí. Ocenění nemovitosti zdarma.',
  phone: '+420 603 363 935',
  phoneShort: '603 363 935',
  phoneHref: 'tel:+420603363935',
  email: 'syblik@domov-beroun.cz',
  areas: ['Berounsko', 'Praha'],
  // Hodnocení realitní kanceláře Domov na Googlu (ručně ověřeno 21. 11. 2026, aktualizovat občas)
  domovRating: { value: '4,8', count: 108, url: 'https://g.page/r/Cc0NsCLl9E3CEB0' },
  domov: {
    name: 'Domov – realitní společnost s.r.o.',
    shortName: 'realitní kancelář Domov',
    url: 'https://www.domov-beroun.cz/',
    profile: 'https://www.domov-beroun.cz/jan-syblik/',
    since: 1994,
  },

  // --- Napojení na služby (doplní se při nastavení) ---
  // Formspree: ID formuláře, např. 'xyzabcd' z adresy https://formspree.io/f/xyzabcd
  formspreeId: 'mbgozjgb',
  // Google Analytics 4: měřicí ID, např. 'G-XXXXXXXXXX'
  gaId: 'G-68KLCFSSH2',
  // Google Ads: ID konverze, např. 'AW-123456789', a štítek konverze pro odeslání formuláře
  googleAdsId: '',
  googleAdsLeadLabel: '',
  // Sklik (Seznam): ID pro retargeting a konverze
  sklikRetargetingId: '',
  sklikConversionId: '',
  // Ověření Google Search Console (meta tag), pokud se neověří přes doménu
  googleSiteVerification: '',
};
