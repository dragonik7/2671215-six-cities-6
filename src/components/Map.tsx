//src/components/Map.tsx

import React, {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/useMap.ts';
import {Location, Offer} from '../types/types.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../const.ts';
import {useNavigate} from 'react-router-dom';

type MapProps = {
  mapStyle: React.CSSProperties;
  offers: Offer[];
  selectedPoint: Location | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [32, 48],
  iconAnchor: [16, 32]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [32, 48],
  iconAnchor: [16, 32]
});

function Map({mapStyle, offers, selectedPoint}: MapProps): JSX.Element {
  const city = offers[0]?.city;
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }
    const markerLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const {latitude, longitude} = offer.location;

      const marker = new Marker({
        lat: latitude,
        lng: longitude
      });

      marker
        .setIcon(
          selectedPoint !== undefined &&
              latitude === selectedPoint.latitude &&
              longitude === selectedPoint.longitude
            ? currentCustomIcon
            : defaultCustomIcon
        )
        .on('click', () => {
          navigate(`/offer/${offer.id}`);
        })
        .addTo(markerLayer);
    });


    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, offers, selectedPoint, navigate]);

  return <div style={mapStyle} ref={mapRef}></div>;
}

export default Map;
