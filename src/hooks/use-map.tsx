import { useEffect, useState, useRef } from 'react';
import leaflet, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface UseMapProps {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  containerMapRef: React.RefObject<HTMLElement | null>;
}

export default function useMap({ containerMapRef, location }: UseMapProps) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect((): void => {
    if (containerMapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(containerMapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [containerMapRef, location]);

  return map;
}
