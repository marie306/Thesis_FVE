# Methodology – rozhodnutí a odůvodnění

## Design studie

### Část A – Reakce na sucho (FVE vs. kontrola)
- Senzor: Sentinel-2 (NDVI, NDMI) + Landsat (LST)
- Design: paired site design
- Statistika: párový t-test (Jamovi)

### Část B – Dlouhodobý vývoj uvnitř FVE (before-after)
- Senzor: Landsat (celá časová řada, konzistentní)
- Indexy: NDVI, BSI, LST
- Odůvodnění: konzistence dat napříč celou časovou řadou 
  důležitější než rozlišení; 30m pixel Landsatu dostačující 
  pro sledování trendu na plochách >20 ha; Sentinel-2 
  (dostupný od 2017) vynechán záměrně

---

## Vymezení polygonů

### FVE polygon
- Vnitřní buffer: 50 m (Sentinel-2), 60 m (Landsat)
- Odůvodnění: eliminace smíšených pixelů na okraji FVE -ještě zkusit reálný rozdíl na Vepřeku

### FVE - kritéria výběru 
1. **Rozloha** - min plocha 20 ha
2. **Datum instalace** – po roce 2005; podmínka existence 
   Landsat dat před instalací pro before-after design

### Kontrolní plocha – kritéria výběru (v pořadí priority)

1. **Velikost** – minimum 80 % rozlohy FVE; výjimka možná při splnění
   všech ostatních kritérií
2. **Reliéf** – shodná expozice a podobný sklon; důležitější než
   vzdálenost (přímý vliv na vodní bilanci půdy)
3. **BPEJ** – shoda na úrovni HPJ (první dvě číslice BPEJ)
4. **Vzdálenost** – preferovaná do 2 km, akceptovatelné do 5 km
   při shodném klimatickém regionu
5. **Les a vodní plocha** – kontrolní plocha nesmí obsahovat les ani
   vodní plochu; přítomnost těchto prvků v okolí do 100 m se
   dokumentuje jako potenciální limitace, není vyřazovacím kritériem

## Indexy

| Index | Senzor | Pásma | Co měří | Část |
|---|---|---|---|---|
| NDVI | Sentinel-2 / Landsat | B8+B4 / B5+B4 | Vegetační stres | A + B |
| NDMI | Sentinel-2 | B8+B11 | Vodní stres vegetace | A |
| BSI | Landsat | B6+B4+B5+B2 | Vývoj půdního pokryvu | B |
| LST | Landsat | termální pásmo | Teplota povrchu | A + B |

---

## Časová okna

| Rok | Charakter | Senzor |
|---|---|---|
| před 2010 | před instalací FVE | Landsat |
| 2017 | normální referenční rok | Sentinel-2 |
| 2018 | extrémní sucho (521 mm) | Sentinel-2 |
| 2020/2024 | mokrý referenční rok | Sentinel-2 |
| 2026 | aktuální data (suché jaro, upřesnění na podzim) | Sentinel-2 |

Analyzovaná sezóna: 
- Hlavní okno: červen–září (všechna časová období)
- Rozšířené okno: březen–říjen (2026, before-after časová řada)
- Říjen: regenerační dynamika

---

## Zpracování dat – GEE

- Kolekce Sentinel-2: COPERNICUS/S2_SR_HARMONIZED
- Filtr oblačnosti: < 50 % + SCL cloudmask na úrovni pixelu
- Kompozit: medián za dané časové okno
- Poznámka: zaznamenat počet snímků vstupujících do každého kompozitu

---

## BPEJ – párování lokalit
- Primární kritérium: shoda HPJ (první dvě číslice BPEJ)
- Pokud HPJ nesedí: shoda klimatické oblasti + podobná HPJ skupina
- Odchylka dokumentována pro každou lokalitu zvlášť v tabulce lokalit

---

## Otevřené otázky
- [ ] Velikost bufferu ověřit na Vepřku
- [ ] SCL cloudmask otestovat na Vepřku
- [ ] Finalizovat kritéria BPEJ párování
- [ ] Počet lokalit: cíl 8+
