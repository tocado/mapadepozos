import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = (props) => {
  const { description, name } = props.data;
  return (
    <Popup>
      <div><b>{name}</b><hr/><br/><br/>{description}</div>
    </Popup>
  );
};

export default MarkerPopup;
