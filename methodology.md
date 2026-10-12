# Methodology – Key Decisions and Rationale

## Study Design

### Part A – Drought Response (PV park vs. control)
- Sensors: Sentinel-2 (NDVI, NDMI) + Landsat (LST)
- Design: paired site design
- Statistics: paired t-test (Jamovi)

### Part B – Long-term Development Within the PV Park (before–after)
- Sensor: Landsat (full consistent time series)
- Indices: NDVI, BSI, LST
- Rationale: data consistency across the full time series was prioritized over spatial resolution; Landsat's 30 m pixel is sufficient for trend detection on sites >20 ha. Sentinel-2 (available only from 2017) was deliberately excluded to preserve a longer pre-installation baseline.

---

## Site Delineation

- Software: QGIS, CRS: EPSG:32633
- Base map: ESRI World Imagery (QuickMapServices)

### Boundary Definition & Sensitivity Analysis
Tested on the pilot site (Vepřek): full PV polygon vs. polygon with a −30 m internal buffer. The difference was statistically significant (NDVI, paired t-test, p < 0.001, Cohen's d = 1.08), confirming an edge effect from the panels. **Decision:** a −30 m internal buffer was adopted for the final analysis, eliminating panel edge effects and capturing the vegetation signal from within the PV site.

### PV Site Selection Criteria
1. **Area:** minimum 20 ha
2. **Installation date:** after 2005, ensuring sufficient pre-installation Landsat data for the before-after design

### Control Site Selection Criteria (in priority order)
1. **Land use:** arable land (per LPIS, the Czech Land Parcel Identification System)
2. **Size:** minimum 80% of PV site area; exceptions possible if all other criteria are met
3. **Terrain:** matching aspect and similar slope — prioritized over distance, due to direct impact on soil water balance
4. **Soil classification:** match at the main soil unit level (first two digits of BPEJ, the Czech agricultural soil-ecological classification code)
5. **Distance:** preferably within 2 km, acceptable up to 5 km within the same climatic region
6. **Forest/water bodies:** control sites must not contain forest or water bodies; presence within 100 m of the site is documented as a potential limitation rather than an exclusion criterion

## Site List

| Site | Area (ha) | Installation year |
|---|---|---|
| Vepřek | 72 | 2010 |
| Ševětín-Drahotěšice | 34 | 2010 |
| Brno Tuřany | 40 | 2010 |
| Stříbro | 28 | 2009 |
| Sokolnice | 28 | 2010 |
| Veselí nad Moravou | 36 | 2010 |
| Břest | 29 | 2010 |

---

## Indices

| Index | Sensor | Bands | Measures | Part |
|---|---|---|---|---|
| NDVI | Sentinel-2 / Landsat | B8+B4 / B5+B4 | Vegetation stress | A + B |
| NDMI | Sentinel-2 | B8+B11 | Vegetation water stress | A |
| BSI | Landsat | B6+B4+B5+B2 | Land cover / bare soil development | B |
| LST | Landsat | thermal band | Surface temperature | A + B |

---

## Time Windows – Part A

| Year | Character | Sensor |
|---|---|---|
| 2017 | normal reference year | Sentinel-2, LST |
| 2018 | extreme drought (521 mm) | Sentinel-2, LST |
| 2019 | post-drought | Sentinel-2, LST |
| 2020 | wet reference year | Sentinel-2, LST |
| 2026 | current data (dry spring; refined in autumn) | Sentinel-2, LST |

*2019: 634 mm (92% of the 1991–2020 normal) — slightly below normal, but acceptable as a reference year following the 2018 drought extreme; possible residual soil moisture deficit noted for discussion.*

Analyzed season: March–October. Early-season (March) NDVI may be low due to crop phenological stage; addressed in the discussion and, where necessary, excluded from evaluation.

---

## Time Windows – Part B (before–after)

Years defined relative to the PV installation year (I):

| Phase | Years | Note |
|---|---|---|
| Pre-installation | I-3, I-2, I-1 | baseline – arable land condition |
| Post-installation | I+1 to I+5 | disturbance phase, stabilization |
| Reference years | 2017, 2018, 2020 | shared with Part A |
| Current | 2026 | |

Analyzed season: March–October (monthly resolution — chosen over seasonal averaging to preserve phenological detail before and after installation, which a seasonal average would obscure).

---

## Data Processing – Google Earth Engine

- Collection: COPERNICUS/S2_SR_HARMONIZED (Sentinel-2)
- Cloud filter: CLOUDY_PIXEL_PERCENTAGE < 50% (Part A); relaxed to < 70% for Part B to retain sufficient LST data, median composite per time window
- (Pixel-level SCL cloud masking was evaluated but not implemented — the cloud percentage filter with median compositing was judged sufficient for monthly composites on sites >20 ha)
- Number of images per composite recorded for transparency

---

## Key Methodological Decisions

- **Buffer size:** validated on the Vepřek pilot site via sensitivity analysis (paired t-test, t = −6.14, p < 0.001, d = 1.08 vs. full polygon) → −30 m internal buffer adopted
- **Cloud masking:** CLOUDY_PIXEL_PERCENTAGE filter + median composite used instead of per-pixel SCL masking (sufficient for the spatial/temporal scale of this study)
- **Control site matching:** finalized based on the criteria hierarchy above (land use → size → terrain → soil classification → distance)
- **Number of sites:** target of 5+ met (7 sites total)
- **Part B temporal resolution:** monthly resolution selected over seasonal averaging to retain phenological detail

---

## Data Sources

| Source | Data | URL |
|---|---|---|
| Google Earth Engine | Sentinel-2 L2A, Landsat 8/9 | code.earthengine.google.com |
| VÚMOP | BPEJ soil classification layer | vumop.cz |
| LPIS | Agricultural land use type | eagri.cz |
| ERU (Czech Energy Regulatory Office) | Database of PV installations in Czechia | eru.cz |
| ČHMÚ (Czech Hydrometeorological Institute) | Precipitation normals and annual totals | chmi.cz |
| envidata.cz | Annual precipitation totals by year | envidata.cz |
| Copernicus Browser | Visual image inspection | browser.dataspace.copernicus.eu |
| Mapy.cz | Site GPS coordinates | mapy.cz |

## Plán statistické analýzy – část A (DiD)
*Stanoveno 8. 10. 2026, před výpočtem*

| | Hlavní | Sekundární | Citlivostní |
|---|---|---|---|
| Index | NDVI | LST, NDMI | — |
| Kontrast | 2018 vs. 2020 | 2026 vs. 2020 | 2018 vs. průměr 2017 + 2020 |
| Okno | IV–VI | IV–VI | III–IX |
| Metrika | absolutní DiD | absolutní DiD | relativní DiD |
| Test | jednovýběrový t-test DiD (n = 7) + Wilcoxon | stejně | stejně |
| Výstup | průměrný DiD, 95% CI, d_z | stejně | jestli se mění směr nebo závěr |

**Definice**
- Δ = hodnota_FVE − hodnota_ctrl (lokalita × rok × měsíc), zprůměrováno za okno → jedna hodnota na lokalitu a rok
- DiD = Δ_kontrastní rok − Δ_referenční rok (jedna hodnota na lokalitu)
- Relativní DiD = rel_FVE − rel_ctrl, kde rel = (X_rok − X_ref) / X_ref
- Interpretace (NDVI): DiD > 0 → FVE ztratila v suchu méně než kontrola

**Vyřazení dat**
- pár vyřazen, pokud valid_frac < 0,5 u FVE nebo kontroly (příznaky S2_ok, LST_ok)
- LST: lokalita Břest vyřazena celá (technická mezera v produktu Landsat C2 L2 ST) → n = 6
- 2019 nepoužit jako reference (rok po suchu)

## Plán statistické analýzy – část B (BACI)
*Stanoveno 12. 10. 2026, před výpočtem*

### Design
- BACI (Before–After–Control–Impact): FVE (impact) vs. kontrolní orná půda (control), před vs. po instalaci FVE
- Odůvodnění: přechod senzorů TM/ETM+ → OLI v roce 2013 a meziroční rozdíly počasí působí na FVE i kontrolu stejně a v rozdílu FVE − ctrl se vyruší; samotná časová řada FVE by je nedokázala odlišit od efektu instalace
- Data: `PartB_vsechny_lokality_v2_1` (GEE skript FVE_partB_v2.js, v2.1), Landsat C2 L2, okno IV–VI

### Definice
- Δ = hodnota_FVE − hodnota_ctrl (lokalita × rok × měsíc), zprůměrováno za IV–VI → jedna hodnota na lokalitu a rok
- Δ_před = průměr Δ za roky I−3, I−2, I−1
- Δ_po = průměr Δ za roky I+1 až I+5
- BACI = Δ_po − Δ_před (jedna hodnota na lokalitu)
- I = rok instalace (Stříbro 2009, ostatní 2010); rok instalace se do analýzy nezahrnuje
- Interpretace (NDVI): BACI < 0 → po instalaci se vegetace FVE vůči kontrole snížila

### Plán testů

| | Hlavní | Sekundární | Popisné / citlivostní |
|---|---|---|---|
| Index | NDVI | BSI, LST | — |
| Kontrast | Δ_po (I+1…I+5) vs. Δ_před (I−3…I−1) | stejně | Δ v referenčních letech 2017, 2018, 2020, 2026 vs. Δ_před; rozdělení po instalaci na I+1…I+2 a I+3…I+5 |
| Okno | IV–VI | IV–VI | IV–VI |
| Test | jednovýběrový t-test BACI (n = 7) + Wilcoxon | stejně (LST n = 6) | popisně, bez testování |
| Výstup | průměrný BACI, 95% CI, d_z, počet kladných | stejně | průběh Δ v čase (graf), svislá čára instalace a přechodu senzorů 2013 |

### Vyřazení dat
- měsíc vyřazen, pokud SR_valid_frac (NDVI, BSI) nebo ST_valid_frac (LST) < 0,5 u FVE nebo kontroly
- LST: lokalita Břest vyřazena celá (mezera v produktu Landsat C2 L2 ST – ctrl 0 %, FVE 37 % platné plochy) → n = 6
- NDVI a BSI jen z pixelů s fyzikálně platnou reflektancí (0–1 ve všech kanálech); vyřazena mj. scéna 2015-03 nad jižní Moravou (chybná atmosférická korekce)
- rok 2012 pokryt pouze Landsatem 7 (SLC-off) – ponechán, s vyšším podílem chybějících pixelů

### Známá omezení
- přechod senzorů v roce 2013 (I+3 u lokalit z roku 2010): BACI ho vyrovnává jen za předpokladu, že se senzorový posun projevuje na FVE i kontrole stejně
- ~30 % měsíců stojí na jediné scéně → agregace na roční průměr IV–VI
- střídání plodin na kontrole zvyšuje variabilitu Δ; průměrování přes 3 (před) a 5 (po) let ji tlumí
- n = 7 (LST n = 6) → nízká síla testu; interpretovat hlavně velikost efektu a 95% CI
