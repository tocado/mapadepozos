import React from "react";
import { Tooltip, Marker } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";
import markerSVG from "../assets/marker.svg"
import L from 'leaflet'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css';

const markerIcon = new L.Icon({
  iconUrl: markerSVG,
  iconRetinaUrl: markerSVG,
  popupAnchor: [-0, -0],
//  iconSize: [32, 45],
  iconSize: [10, 10],
});
const Markers = (props) => {
  const { markers } = props;
  let TmpMarkers = <></>
  if (markers) {
    //let t = markers.filter((m) => m.name === '042-2531' || m.name === '042-0736')
    TmpMarkers = markers.map((m, i) => (
    //TmpMarkers = t.map((m, i) => (
      <Marker key={i} position={m.geometry} icon={markerIcon}>
        <MarkerPopup data={m} />
        <Tooltip>{m.names}</Tooltip>
      </Marker>
      // <Circle key={i} center={m.geometry} pathOptions={{ color: 'red' }} radius={100}>
      //   <MarkerPopup data={m} />
      //   <Tooltip>{m.name}</Tooltip>
      // </Circle >
    ));
  }
  return <MarkerClusterGroup maxClusterRadius={60} disableClusteringAtZoom={6}>{TmpMarkers}</MarkerClusterGroup>;
};

export default Markers;
//salitral levalle cerca de la 152