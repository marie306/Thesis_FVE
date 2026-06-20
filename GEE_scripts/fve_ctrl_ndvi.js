//var fve = FVE;//původníručnígeometrie
//var kontrola = kontrola;//původníručnígeometrie

// Načíst polygony z assetu
var lokality = ee.FeatureCollection(
  'projects/diplomka-fv-2018/assets/lokality_fve');

// Filtrovat podle typu
var fve = lokality.filter(ee.Filter.eq('type', 'FVE'))
                  .geometry();
var fve_buffer = lokality.filter(ee.Filter.eq('type', 'FVE_buffer'))
                         .geometry();
var kontrola = lokality.filter(ee.Filter.eq('type', 'ctrl'))
                       .geometry();

// Funkce pro výpočet průměrného NDVI za dané období
function getNDVI(startDate, endDate, geometry) {
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(geometry)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
    .select(['B2','B3','B4','B8'])
    .median();
  var ndvi = s2.normalizedDifference(['B8', 'B4']);
  return ndvi.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: geometry,
    scale: 10
  }).get('nd');
  return ee.Algorithms.If(s2.size().gt(0), result, null);
}

// Časová řada - měsíce 2017 a 2018
var obdobi = [
  ['2017-06', '2017-06-01', '2017-06-30'],
  ['2017-07', '2017-07-01', '2017-07-31'],
  ['2017-08', '2017-08-01', '2017-08-31'],
  ['2017-09', '2017-09-01', '2017-09-30'],
  ['2018-06', '2018-06-01', '2018-06-30'],
  ['2018-07', '2018-07-01', '2018-07-31'],
  ['2018-08', '2018-08-01', '2018-08-31'],
  ['2018-09', '2018-09-01', '2018-09-30'],
  ['2018-10', '2018-10-01', '2018-10-31'],
  ['2019-06', '2019-06-01', '2019-06-30'],
  ['2019-07', '2019-07-01', '2019-07-31'],
  ['2019-08', '2019-08-01', '2019-08-31'],
];
var results = obdobi.map(function(o) {
  var label = o[0];
  var start = o[1];
  var end   = o[2];
  var ndviFve      = getNDVI(start, end, fve);
  var ndviKontrola = getNDVI(start, end, kontrola);
  return ee.Feature(null, {
    'Obdobi':   label,
    'NDVI_FVE': ndviFve,
    'NDVI_kontrola': ndviKontrola
  });
});

var tabulka = ee.FeatureCollection(results);
print('Tabulka NDVI:', tabulka);

// Export do Google Drive jako CSV
Export.table.toDrive({
  collection: tabulka,
  description: 'NDVI_FVE_Veprek',
  fileFormat: 'CSV'
});


// Vizualizace - srpen 2018
var s2_aug18 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(fve)
  .filterDate('2018-08-01', '2018-08-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .median();
var ndvi_aug18 = s2_aug18.normalizedDifference(['B8', 'B4']);
Map.addLayer(ndvi_aug18, {min: -0.2, max: 0.8, 
  palette: ['red', 'yellow', 'green']}, 'NDVI srpen 2018');
Map.addLayer(fve, {color: 'blue'}, 'FVE');
Map.addLayer(kontrola, {color: 'red'}, 'Kontrola');
Map.addLayer(fve, {color: 'red'}, 'FVE z assetu');
Map.addLayer(kontrola, {color: 'blue'}, 'Ctrl z assetu');
Map.centerObject(fve, 13);
