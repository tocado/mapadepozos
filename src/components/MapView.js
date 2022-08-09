import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import data from "../assets/srcSalta.json";
import Markers from "./Markers";

import "leaflet/dist/leaflet.css";

const MapView = (props) => {
  const [state] = useState({
    currentLocation: { lat: -38.5094661, lng: -73.8996827 },
    zoom: 4,
    data: data,
  });
  let markers = data.map(function (o) {
    return {
      description: o.desc,
      name: o.name,
      geometry: [
        o.y.replace(',','.'),
        o.x.replace(',','.')
      ]
    }
  })
  console.log(markers)
  return (
    <MapContainer center={state.currentLocation} zoom={state.zoom}>
      <TileLayer
        url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers markers={markers} />
    </MapContainer>
  );
};

export default MapView;
