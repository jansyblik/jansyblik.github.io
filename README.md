# Web jansyblik.cz

Osobní web realitního makléře Jana Syblíka. Postavený v Astru jako rychlý statický web.

## Co kde je

- `src/data/site.js` – kontakty a napojení na služby (Formspree, Google Analytics, Google Ads, Sklik, Search Console)
- `src/data/faq.js` – časté dotazy (zobrazují se na webu i jako data pro Google a AI asistenty)
- `src/data/sold.json` – prodané nemovitosti
- `src/data/listings-snapshot.json` – záloha nabídek pro případ, že web Domova nebude dostupný
- `src/lib/listings.js` – při sestavení webu načte aktuální nabídky z https://www.domov-beroun.cz/jan-syblik/
- `src/pages/index.astro` – úvodní stránka
- `src/assets/` – fotky a logo
- `logo/` – logo ke stažení (SVG pro web a tisk, PNG pro profily)

## Příkazy

```
npm install       # jednou, nainstaluje nástroje
npm run dev       # náhled při úpravách
npm run build     # sestaví hotový web do složky dist/
```
