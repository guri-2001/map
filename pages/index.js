// components/GoogleMap.js

import React, { useState } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

function GoogleMaps() {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    places.forEach((place) => {
      if (place.geometry && place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}  libraries={["places"]}>
      <GoogleMap
        center={{ lat: 0, lng: 0 }}
        zoom={5}
        onLoad={onMapLoad}
        mapContainerStyle={{width:"100%", height:"100vh"}}
        >
          </GoogleMap>
        <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for a place"
            style={{
              boxSizing: "border-box",
              border: "1px solid transparent",
              width: "240px",
              height: "32px",
              padding: "0 12px",
              borderRadius: "3px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              fontSize: "14px",
              outline: "none",
              textOverflow: "ellipses",
              marginBottom:"100px"
            }}
          />
        </StandaloneSearchBox>
    </LoadScript>
  );
}

export default GoogleMaps;
