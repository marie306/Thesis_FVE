*Original Czech version with full working notes — see root `METHODOLOGY.md` for the English summary.*

---

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

## Vymezení analyzovaných ploch

### Technický postup
- software (QGIS) , CRS (EPSG:32633), zdroj podkladové mapy (ESRI World Imagery -QuicMapServices)

### Definice hranic
- FVE polygon (full) X FVE polygon (buffer −30 m) ? (otestuji na vzorovém příkladu Vepřek a pak se rozhodnu)
- kontrolní plocha

### Sensitivity analysis hranice ROI
- postup testování na Vepřeku - 16.7. test senzitivity - rozdíl mezi plnou plochou a plochou s bufferem (-30 m) je statisticky významný (NDVI_FVE_Veprek, párový t-test, p<0,001, Cohenovo d=1,08, Jamovi) -> pro finální analýzu zvolen interní buffer 30 m, který eliminuje okrajový efekt panelů a zachycuje vegetační signál uvnitř FVE.

### FVE - kritéria výběru 
1. **Rozloha** - min plocha 20 ha
2. **Datum instalace** – po roce 2005; podmínka existence 
   Landsat dat před instalací pro before-after design

### Kontrolní plocha – kritéria výběru (v pořadí priority)

1. **Využití půdy** - orná půda (LPIS)
2. **Velikost** – minimum 80 % rozlohy FVE; výjimka možná při splnění
   všech ostatních kritérií
3. **Reliéf** – shodná expozice a podobný sklon; důležitější než
   vzdálenost (přímý vliv na vodní bilanci půdy)
4. **BPEJ** – shoda na úrovni HPJ (první dvě číslice BPEJ)
5. **Vzdálenost** – preferovaná do 2 km, akceptovatelné do 5 km
   při shodném klimatickém regionu
6. **Les a vodní plocha** – kontrolní plocha nesmí obsahovat les ani
   vodní plochu; přítomnost těchto prvků v okolí do 100 m se
   dokumentuje jako potenciální limitace, není vyřazovacím kritériem

## Seznam lokalit

| Lokalita | Rozloha(ha) | Datum vzniku | 
|---|---|---|
| Vepřek | 72 | 2010 |
| Ševětín-Drahotěšice | 34 | 2010 |
| Brno Tuřany | 40 | 2010 |
| Stříbro | 28 | 2009 |
| Sokolnice | 28 | 2010 |
| Veselí nad Moravou | 36 | 2010 |
| Břest | 29 | 2010 |

---

## Indexy

| Index | Senzor | Pásma | Co měří | Část |
|---|---|---|---|---|
| NDVI | Sentinel-2 / Landsat | B8+B4 / B5+B4 | Vegetační stres | A + B |
| NDMI | Sentinel-2 | B8+B11 | Vodní stres vegetace | A |
| BSI | Landsat | B6+B4+B5+B2 | Vývoj půdního pokryvu | B |
| LST | Landsat | termální pásmo | Teplota povrchu | A + B |

---

## Časová okna - část A 

| Rok | Charakter | Senzor |
|---|---|---|
| 2017 | normální referenční rok | Sentinel-2, LST |
| 2018 | extrémní sucho (521 mm) | Sentinel-2, LST |
| 2019 | post-drought | Sentinel-2, LST |
| 2020 | mokrý referenční rok | Sentinel-2,LST |
| 2026 | aktuální data (suché jaro, upřesnění na podzim) | Sentinel-2, LST |

*LST termální pásmo,všechna časová období 
*2019: 634 mm (92 % normálu 1991–2020); mírně podnormální, 
akceptovatelné jako referenční rok po extrému sucha 2018*

Analyzovaná sezóna: 
- březen-říjen(v březnu můžebýt NDVI nízké kvůli časné fenologické fázi pěstovaných rostlin - diskutovat a případně odůvodnit, případně dodatečně z hodnocení vyloučit a vysvětlit) 

---

## Časová okna – část B (before-after)

Roky jsou definovány relativně k roku instalace FVE (I):

| Fáze | Roky | Poznámka |
|---|---|---|
| Před instalací | I-3, I-2, I-1 | baseline – stav orné půdy |
| Po instalaci | I+1, I+2, I+3, I+4, I+5 | disturbance fáze, stabilizace |
| Referenční roky | 2017, 2018, 2020 | sdílené s částí A |
| Aktuální | 2026 | |

Analyzovaná sezóna: březen–říjen

---

## Zpracování dat – GEE

- Kolekce Sentinel-2: COPERNICUS/S2_SR_HARMONIZED
- Filtr oblačnosti: < 50 % (část A); rozšířeno na < 70 % pro část B kvůli dostatku dat pro LST
- Kompozit: medián za dané časové okno
- Poznámka: zaznamenat počet snímků vstupujících do každého kompozitu

---

## BPEJ – párování lokalit
- Primární kritérium: shoda HPJ (první dvě číslice BPEJ)
- Pokud HPJ nesedí: shoda klimatické oblasti + podobná HPJ skupina
- Odchylka dokumentována pro každou lokalitu zvlášť v tabulce lokalit

---

## Otevřené otázky
- [x] Velikost bufferu ověřit na Vepřeku (sensitivity analysis ROI) - velikost bufferu ověřena na Vepřeku (sensitivity analysis ROI)
  → Zvolen interní buffer −30 m na základě párového t-testu 
  (t = −6.14, p < 0.001, d = 1.08 vs. full polygon)
- [x] SCL cloudmask
  → Neimplementován; použit filtr CLOUDY_PIXEL_PERCENTAGE s mediánovým kompozitem. 
  Standardní přístup dostačující pro měsíční kompozity na plochách >20 ha.
- [x] Finalizovat kritéria BPEJ párování - splněno
- [x] Počet lokalit: cíl 5+ - splněno (celkem 7 lokalit)
- [x] Časová okna část B: měsíční rozlišení vs. sezónní průměr
  → Zvoleno měsíční rozlišení (březen–říjen). Sezónní variabilita 
  je výrazná a měsíční data umožňují sledovat fenologický vývoj 
  před a po instalaci FVE. Sezónní průměr by tuto informaci ztratil.

---

## Poznámky 
- 2019 - srážky 634 mm,92% normálu X může přetrvávat deplece z 2018 (uveď v diskuzi)
- Cloud filter pro část B ponechán na 70 % kvůli dostatku dat pro LST – zdůvodnění v diskuzi

---

## Poznámky k datům – Vepřek (pilotní lokalita)
- Březen a říjen 2017: pouze 1 snímek – interpretovat s opatrností
- Data exportována jako CSV do Google Drive/Diplomka/Data/Veprek/

## Datové zdroje

| Zdroj | Data | URL |
|---|---|---|
| Google Earth Engine | Sentinel-2 L2A, Landsat 8/9 | code.earthengine.google.com |
| VÚMOP | BPEJ vrstva | vumop.cz |
| LPIS | Druh zemědělské půdy | eagri.cz |
| ERU | Databáze FVE v ČR | eru.cz |
| ČHMÚ | Srážkové normály a roční úhrny | chmi.cz |
| envidata.cz | Roční úhrny srážek po letech | envidata.cz |
| Copernicus Browser | Vizuální průzkum snímků | browser.dataspace.copernicus.eu |
| Mapy.cz | GPS lokalit | mapy.cz |
