import { useEffect, useState, useRef, useMemo } from 'react';
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

  const center: [number, number] = useMemo(
    () => [location.latitude, location.longitude],
    [location.latitude, location.longitude],
  );

  useEffect((): void => {
    if (containerMapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(containerMapRef.current, {
        center,
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [center, containerMapRef, location]);

  return map;
}
