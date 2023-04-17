import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = (props) => {
  const { names } = props.data;
  return (
    <Popup>
      <div><b>{names}</b></div>
    </Popup>
  );
};

export default MarkerPopup;
