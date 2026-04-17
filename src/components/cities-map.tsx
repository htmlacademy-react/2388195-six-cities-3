import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, CITIES } from '@/const';
import { useAppSelector } from '@/hooks/store-hooks';
import useMap from '@/hooks/use-map';
import { CityName, FullOffer, ListOffers } from '@/types/offer';
import { LayerGroup } from 'leaflet';
import { useRef, useEffect } from 'react';
import L from 'leaflet';
import { selectActiveId } from '@/store/slices/app-slice';

interface CitiesMapProps {
  className?: string;
  currentCity: CityName;
  currentOffers: ListOffers;
  currentOffer?: FullOffer;
}

const defaultCustomIcon = L.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = L.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export default function CitiesMap({
  className,
  currentCity,
  currentOffers,
  currentOffer,
}: CitiesMapProps): JSX.Element {
  const containerMapRef = useRef<HTMLElement>(null);
  const markerLayer = useRef<LayerGroup>(L.layerGroup());
  const activeOfferId = useAppSelector(selectActiveId);
  const city =
    CITIES.find(
      (item) => item.name.toLowerCase() === currentCity.toLowerCase(),
    ) || CITIES[0];
  const map = useMap({ containerMapRef, location: city.location });

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
      );
    }
  }, [city, map]);

  // useEffect(() => {
  //   if (map) {
  //     markerLayer.current.clearLayers();
  //     markerLayer.current.addTo(map);
  //     currentOffers.forEach((currentOffer) => {
  //       L.marker(
  //         {
  //           lat: currentOffer.location.latitude,
  //           lng: currentOffer.location.longitude,
  //         },
  //         {
  //           icon: currentOffer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
  //         },
  //       ).addTo(markerLayer.current);
  //     });
  //   }
  // }, [activeOfferId, map, currentOffers]);

  useEffect(() => {
    if (map) {
      markerLayer.current.clearLayers();
      markerLayer.current.addTo(map);
      currentOffers.forEach((offer) => {
        L.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon:
              offer.id === activeOfferId
                ? currentCustomIcon
                : defaultCustomIcon,
          },
        ).addTo(markerLayer.current);
      });
    }

    if (currentOffer) {
      L.marker(
        [currentOffer.location.latitude, currentOffer.location.longitude],
        {
          icon: currentCustomIcon,
        },
      ).addTo(markerLayer.current);
    }
  }, [activeOfferId, map, currentOffers, currentOffer]);

  return (
    <section className={`map ${className}`} ref={containerMapRef}></section>
  );
}
