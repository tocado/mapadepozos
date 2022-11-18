import React, { useState, useEffect } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useMap } from 'react-leaflet/hooks'
import data from "../assets/csvjson.json";
import Markers from "./Markers";
import { GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as topojson from "topojson-client";

const Eventos = (props) => {
  let {layerStatus} = props
  const map = useMap()
  useEffect(() => {
    map.setView(layerStatus.posicion, layerStatus.zoom);
  }, [layerStatus.posicion]);
  //console.table(map.getCenter())
  // map.setPosition(layerStatus.posicion, layerStatus.zoom)
  // map.flyTo(layerStatus.posicion, layerStatus.zoom, {'duration':0.25} )
  return null
}
const MapView = (props) => {
  const [cuencas, setCuencas] = useState({})
  const [provincias, setProvincias] = useState({})

  const { layerStatus } = props;
  let markers = data.map(function (o) {
    return {
      description: o.desc,
      name: <>
        <h5>o.name</h5>
        <table>
          <tr>
            <th>
              Nombre
            </th>
            <td>
              {o.name}
            </td>
          </tr>
          <tr>
            <th>
              Caudal Medio
            </th>
            <td>
              {o.Caudalmedio || '-'}
            </td>
          </tr>
          <tr>
            <th>
              Profundiad
            </th>
            <td>
              {o.Profundidad || '-'}
            </td>
          </tr>
          <tr>
            <th>
              NivelDinamico
            </th>
            <td>
              {o.NivelDinamico || '-'}
            </td>
          </tr>
          <tr>
            <th>
              NivelEstatico
            </th>
            <td>
              {o.NivelEstatico || '-'}
            </td>
          </tr>
          <tr>
            <th>
              Uso
            </th>
            <td>
              {o.Uso || '-'}
            </td>
          </tr>
          <tr>
            <th>
              Provincia
            </th>
            <td>
              {o.Provincia || '-'}
            </td>
          </tr>
          <tr>
            <th>
              Fuente
            </th>
            <td>
              {o.DuenioDelDato || '-'}
            </td>
          </tr>
        </table>
      </>,
      geometry: [
        o.y,
        o.x
      ]
    }
  })

  const onEach = (feature, layer) => {
    let PopupContent = "<pre>" +
      JSON.stringify(feature.properties, null, " ").replace(/[{}"]/g, "") +
      "</pre>";
    layer.bindPopup(PopupContent)
  }
  useEffect(() => {
    let opt = {
      method: 'GET',
    }
    // options = {
    // method: 'POST',
    // headers: headers,
    // body: JSON.stringify({
    // securityEnabledOnly: true,
    // }),
    fetch('cuencastopo.json', opt).then((res) => {
      res.json().then((jsonCuencas) => {
        setCuencas(topojson.feature(jsonCuencas, jsonCuencas.objects.cuencas))
      })
    })
    fetch('provincias.json', opt).then((res) => {
      res.json().then((jsonProvincias) => {
        setProvincias(jsonProvincias)
      })
    })
  }, [])

  return (
    <>
      <MapContainer center={layerStatus.posicion} zoom={layerStatus.zoom}>
        <Eventos layerStatus={layerStatus} />
        <TileLayer
          url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Pozos de Agua" checked={layerStatus.pozos || false}>
            <Markers markers={markers} />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Cuencas de Agua" checked={layerStatus.cuencas || false}>
            {Object.keys(cuencas).length > 1 && (
              <GeoJSON data={cuencas} onEachFeature={onEach} />
            )}
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Provincias" checked={true}>
            {Object.keys(provincias).length > 1 && (
              <GeoJSON data={provincias} />
            )}
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
};
// comando para reducir
// /c/Users/harkonnen/Documents/mapapozos/mapadepozos/node_modules/topojson/node_modules/topojson-server/bin/geo2topo -q 100000 src/components/cuencas.json >public/cuencastopo.json
export default MapView;
