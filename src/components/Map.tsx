//src/components/Map.tsx

import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/useMap.ts';
import {City, Location} from '../types/types.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../const.ts';

type MapProps = {
  city: City;
  locations: Location[];
  selectedPoint: Location | undefined;
};

const mapStyle: React.CSSProperties = {
  width: '500px',
  height: '682px',
  borderRadius: '10px'
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

function Map(props: MapProps): JSX.Element {
  const {city, locations, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      locations.forEach((location) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude
        });

        marker.setIcon(
          selectedPoint !== undefined
              && location.longitude === selectedPoint.longitude
              && location.latitude === selectedPoint.latitude
            ? currentCustomIcon
            : defaultCustomIcon
        ).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, locations, selectedPoint]);

  return <div style={mapStyle} ref={mapRef}></div>;
}

export default Map;
