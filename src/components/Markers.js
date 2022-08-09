import React from "react";
import { LayerGroup, Circle, Tooltip } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";

const Markers = (props) => {
  const { markers } = props;
  let TmpMarkers = <></>
  if (markers) {
    TmpMarkers = markers.map((m, i) => (
      <LayerGroup>
        <Circle key={i} center={m.geometry} pathOptions={{ color: 'red' }} radius={100}>
          <MarkerPopup data={m} />
          <Tooltip>{m.name}</Tooltip>
        </Circle >
      </LayerGroup>
    ));
  }
  return <>{TmpMarkers}</>;
};

export default Markers;
