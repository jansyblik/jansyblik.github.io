// Rozpozná nabídky v HTML stránky makléře na webu Domova.
import * as cheerio from 'cheerio';

const BASE = 'https://www.domov-beroun.cz';
const abs = (u) => (!u ? '' : u.startsWith('http') ? u : BASE + (u.startsWith('/') ? '' : '/') + u);
const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

export function parseListings(html) {
  const $ = cheerio.load(html);
  const byId = new Map();

  $('a[href*="/reality/"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const m = href.match(/\/reality\/[^/?#]+-(\d+)\/?(?:[?#].*)?$/);
    if (!m) return;
    const id = m[1];
    const entry = byId.get(id) || { id, url: abs(href), links: [], title: '' };
    entry.links.push(el);
    const text = clean($(el).text());
    if (text.length > entry.title.length) entry.title = text;
    byId.set(id, entry);
  });

  const items = [];
  for (const entry of byId.values()) {
    // Najdi nejvyšší rodičovský prvek, který obsahuje jen tuto nabídku = karta nabídky.
    let card = $(entry.links[0]);
    for (let i = 0; i < 10; i++) {
      const parent = card.parent();
      if (!parent.length || parent.is('body')) break;
      const ids = new Set();
      parent.find('a[href*="/reality/"]').each((_, a) => {
        const mm = ($(a).attr('href') || '').match(/-(\d+)\/?(?:[?#].*)?$/);
        if (mm) ids.add(mm[1]);
      });
      if (ids.size > 1) break;
      card = parent;
    }
    const text = clean(card.text());
    const price = (text.match(/(\d{1,3}(?:[\s ]\d{3})+|\d+)\s*Kč/) || [])[0] || '';
    let location = '';
    card.find('*').each((_, node) => {
      if (location || $(node).children().length) return;
      const t = clean($(node).text());
      if (/^okr\./i.test(t) && t.length < 80) location = t;
    });
    let image = '';
    card.find('img').each((_, img) => {
      const src = $(img).attr('data-src') || $(img).attr('src') || '';
      if (!image && src.includes('/foto/')) image = abs(src);
    });
    if (!image) {
      card.find('a[href*="/foto/"]').each((_, a) => {
        if (!image) image = abs($(a).attr('href'));
      });
    }
    if (!entry.title || !price) continue;
    items.push({
      id: entry.id,
      title: entry.title,
      price: price.replace(/ /g, ' '),
      location: clean(location),
      url: entry.url,
      image,
      reserved: /rezervace/i.test(text),
    });
  }
  return items;
}
