//src/components/Map.tsx

import React, {useEffect, useRef} from 'react';
import {Icon, layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/useMap.ts';
import {City, Location, Offer} from '../types/types.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../const.ts';
import {useNavigate} from 'react-router-dom';

type MapProps = {
  mapStyle: React.CSSProperties;
  city: City;
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

function Map({mapStyle, city, offers, selectedPoint}: MapProps): JSX.Element {
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map || !city) {
      return;
    }

    map.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );
  }, [map, city]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const {latitude, longitude} = offer.location;
      const isSelected = selectedPoint !== undefined &&
      latitude === selectedPoint.latitude &&
      longitude === selectedPoint.longitude
        ? currentCustomIcon
        : defaultCustomIcon;
      const marker = new Marker({
        lat: latitude,
        lng: longitude
      },
      {icon: isSelected}
      );

      marker
        .on('mouseover', () => {
          marker.setIcon(currentCustomIcon);
        })
        .on('mouseout', () => {
          marker.setIcon(
            isSelected ? defaultCustomIcon : currentCustomIcon
          );
        })
        .on('click', () => {
          navigate(`/offer/${offer.id}`);
        })
        .addTo(markerLayer);
    });


    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, offers, selectedPoint, navigate]);

  return <div ref={mapRef} style={mapStyle}/>;
}

export default Map;
