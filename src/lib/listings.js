// Načte aktuální nabídky ze stránky makléře na webu Domova při sestavení webu.
// Když stránka není dostupná nebo se změní její podoba, použije se poslední uložený stav
// (src/data/listings-snapshot.json) a sestavení vypíše varování.
import { parseListings } from './parse-listings.js';
import snapshot from '../data/listings-snapshot.json';
import { site } from '../data/site.js';

export async function getListings() {
  if (process.env.LISTINGS_OFFLINE === '1') return { items: snapshot, source: 'snapshot' };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(site.domov.profile, { signal: ctrl.signal, headers: { 'User-Agent': 'jansyblik.cz build' } });
    clearTimeout(t);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const items = parseListings(await res.text());
    if (!items.length) throw new Error('na stránce nebyly nalezeny žádné nabídky');
    // Doplň lokalitu ze zálohy, pokud ji parser nenašel.
    for (const it of items) {
      if (!it.location) it.location = snapshot.find((s) => s.id === it.id)?.location || '';
    }
    return { items, source: 'live' };
  } catch (err) {
    console.warn(`[nabídky] Nepodařilo se načíst web Domova (${err.message}). Použita uložená záloha.`);
    return { items: snapshot, source: 'snapshot' };
  }
}
