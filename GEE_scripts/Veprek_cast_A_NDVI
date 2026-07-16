// ============================================================
// NDVI analýza - FVE Vepřek - Část A
// Autor: Marie Neterdová | Diplomová práce 2026
// ============================================================

// Načíst polygony z assetu
var lokality = ee.FeatureCollection(
  'projects/diplomka-fv-2018/assets/lokality_fve');

var fve        = lokality.filter(ee.Filter.eq('type', 'FVE')).geometry();
var fve_buffer = lokality.filter(ee.Filter.eq('type', 'FVE_buffer')).geometry();
var kontrola   = lokality.filter(ee.Filter.eq('type', 'ctrl')).geometry();

// ============================================================
// Funkce: průměrný NDVI + počet snímků za dané období a geometrii
// ============================================================
function getNDVI(startDate, endDate, geometry) {
  var kolekce = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(geometry)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
    .select(['B4', 'B8']);
  
  var pocetSnimku = kolekce.size();
  
  var medianImage = kolekce.median();
  
  var ndvi = medianImage.normalizedDifference(['B8', 'B4']);
  
  var hodnota = ndvi.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: geometry,
    scale: 10,
    maxPixels: 1e9
  }).get('nd');
  
  // Vrátí null pokud nejsou žádné snímky
  return ee.List([
    ee.Algorithms.If(pocetSnimku.gt(0), hodnota, null),
    pocetSnimku
  ]);
}

// ============================================================
// Časová období - duben až říjen, roky 2017-2020
// ============================================================
var obdobi = [
  ['2017-03', '2017-03-01', '2017-03-31'],
  ['2017-04', '2017-04-01', '2017-04-30'],
  ['2017-05', '2017-05-01', '2017-05-31'],
  ['2017-06', '2017-06-01', '2017-06-30'],
  ['2017-07', '2017-07-01', '2017-07-31'],
  ['2017-08', '2017-08-01', '2017-08-31'],
  ['2017-09', '2017-09-01', '2017-09-30'],
  ['2017-10', '2017-10-01', '2017-10-31'],
  ['2018-03', '2018-03-01', '2018-03-31'],
  ['2018-04', '2018-04-01', '2018-04-30'],
  ['2018-05', '2018-05-01', '2018-05-31'],
  ['2018-06', '2018-06-01', '2018-06-30'],
  ['2018-07', '2018-07-01', '2018-07-31'],
  ['2018-08', '2018-08-01', '2018-08-31'],
  ['2018-09', '2018-09-01', '2018-09-30'],
  ['2018-10', '2018-10-01', '2018-10-31'],
  ['2019-03', '2019-03-01', '2019-03-31'],
  ['2019-04', '2019-04-01', '2019-04-30'],
  ['2019-05', '2019-05-01', '2019-05-31'],
  ['2019-06', '2019-06-01', '2019-06-30'],
  ['2019-07', '2019-07-01', '2019-07-31'],
  ['2019-08', '2019-08-01', '2019-08-31'],
  ['2019-09', '2019-09-01', '2019-09-30'],
  ['2019-10', '2019-10-01', '2019-10-31'],
  ['2020-03', '2020-03-01', '2020-03-31'],
  ['2020-04', '2020-04-01', '2020-04-30'],
  ['2020-05', '2020-05-01', '2020-05-31'],
  ['2020-06', '2020-06-01', '2020-06-30'],
  ['2020-07', '2020-07-01', '2020-07-31'],
  ['2020-08', '2020-08-01', '2020-08-31'],
  ['2020-09', '2020-09-01', '2020-09-30'],
  ['2020-10', '2020-10-01', '2020-10-31'],
];

// ============================================================
// Výpočet pro každé období
// ============================================================
var results = obdobi.map(function(o) {
  var label = o[0];
  var start = o[1];
  var end   = o[2];
  
  var vysledekFve      = getNDVI(start, end, fve_buffer); // buffer polygon
  var vysledekKontrola = getNDVI(start, end, kontrola);
  
  return ee.Feature(null, {
    'Obdobi':          label,
    'NDVI_FVE':        vysledekFve.get(0),
    'NDVI_kontrola':   vysledekKontrola.get(0),
    'n_snimku_FVE':    vysledekFve.get(1),
    'n_snimku_ctrl':   vysledekKontrola.get(1)
  });
});

var tabulka = ee.FeatureCollection(results);
print('Tabulka NDVI - Vepřek:', tabulka);

// ============================================================
// Export do Google Drive
// ============================================================
Export.table.toDrive({
  collection: tabulka,
  description: 'NDVI_FVE_Veprek_partA',
  folder: 'Diplomka',
  fileFormat: 'CSV'
});

// ============================================================
// Vizualizace - srpen 2018
// ============================================================
var s2_aug18 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(fve)
  .filterDate('2018-08-01', '2018-08-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .median();

var ndvi_aug18 = s2_aug18.normalizedDifference(['B8', 'B4']);

var ndviViz = {min: -0.2, max: 0.8, 
  palette: ['red', 'yellow', 'lightgreen', 'darkgreen']};

Map.centerObject(fve, 13);
Map.addLayer(ndvi_aug18, ndviViz, 'NDVI srpen 2018');
Map.addLayer(fve,        {color: 'blue'},  'FVE polygon');
Map.addLayer(fve_buffer, {color: 'cyan'},  'FVE buffer 30m');
Map.addLayer(kontrola,   {color: 'red'},   'Kontrolní plocha');
