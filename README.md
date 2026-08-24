# Thesis_FVE

## Topic
Evaluation of Photovoltaic Park Response to Extreme Drought Compared to Intensively Managed Arable Land Using Remote Sensing Data

## Objective
The aim of this project is to evaluate the response of photovoltaic parks to extreme drought compared with intensively managed arable land.
The study assesses whether these two land-use types differ in the degree of vegetation stress and subsequent recovery following a climate extreme. The results may contribute to the discussion on the environmental functions of photovoltaic parks in agricultural landscapes and their potential role in landscape adaptation to climate extremes.

## Methods
The analysis uses remote sensing data covering 2017–2020, with a focus on the extreme drought of 2018.
A paired-site design is used, comparing photovoltaic parks with nearby arable control plots. Sites are matched based on soil conditions (BPEJ), area, elevation, slope, aspect, and proximity to settlements and forest edges.
The analysis includes:
- Sentinel-2 and Landsat satellite data
- vegetation and surface indices, including NDVI, NDMI, BSI and LST
- satellite and raster data processing in Google Earth Engine and QGIS
- assessment of vegetation stress during the drought peak and subsequent recovery
- paired statistical comparison of photovoltaic parks and control plots

## Workflow
Site selection → paired control selection → spatial data preparation (QGIS) → satellite data processing & vegetation/surface metrics (GEE) → statistical analysis (Jamovi) → drought response & recovery evaluation

## Repository Structure
- `GEE_scripts/` — Google Earth Engine scripts for satellite data processing and calculation of vegetation and surface metrics
- `methodology.md` — detailed description of site selection, paired study design, data sources and analytical decisions
- `README.md` — project overview

## Tools & Data
Tools: QGIS, Google Earth Engine
Satellite data: Sentinel-2 (NDVI, NDMI), Landsat (NDVI, BSI, LST)
Study design: paired photovoltaic park–arable land sites
Statistical analysis: paired statistical testing (Jamovi)

## Status
MSc thesis project — analysis in progress, expected completion 2027.
