import React from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import Markers from "./Markers";
import { GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ cuencas = {}, mapa, setMap, markers, provincias, pozosPorCuenca } = {}) => {
  if (cuencas.length === 0) {
    return <></>
  }

  const onEach = (feature, layer) => {
    layer.on({
      click: (e) => {
       // debugger
        let PopupContent = `<pre>Cuenca: ${feature.properties.CUENCA}
Sistema: ${feature.properties.SISTEMA__S}
        </pre>`;
        layer.bindPopup(PopupContent)
        mapa.fitBounds(e.target.getBounds())        
        pozosPorCuenca(feature.properties.CUENCA)
        layer.openPopup()
        /*e.stopPropagation()
        e.preventDefault()*/
        return 1
      }
    })
  }

  const layerStatus = {
    zoom: 4,
    posicion: {
      lat: -38.5094661,
      lng: -73.8996827
    },
  }
  return (
    <MapContainer center={layerStatus.posicion} zoom={layerStatus.zoom} ref={setMap}>
      <TileLayer
        url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LayersControl position="topright" >
        <LayersControl.Overlay name="Provincias" checked={true}>
          {Object.keys(provincias).length > 1 && provincias.features.length > 0 && (
            <GeoJSON key={provincias.length + provincias.features[0].properties.name} data={provincias} />
          )}
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Pozos" checked={true}>
          <Markers markers={markers} />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Cuencas" checked={true}>
          {Object.keys(cuencas).length > 1 && cuencas.features.length > 0 && (
            <GeoJSON key={cuencas.length + cuencas.features[0].properties.jurisdiccion} data={cuencas} onEachFeature={onEach} />
          )}
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
// comando para reducir
// /c/Users/harkonnen/Documents/mapapozos/mapadepozos/node_modules/topojson/node_modules/topojson-server/bin/geo2topo -q 100000 src/components/cuencas.json >public/cuencastopo.json
export default MapView;
