import { useEffect, useRef } from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TListOffers } from '../../types';
import useMap from './use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, CITIES_POINTS} from '../../const';
import {TCity} from '../../types';


type CitiesMapProps = {
  currentCity: string;
  currentOffers: TListOffers;
  activeOfferId?: string | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function CitiesMap({currentCity, currentOffers, activeOfferId}: CitiesMapProps): JSX.Element {
  const cityPoint: TCity = CITIES_POINTS.find((city) => currentCity === city.name);
  const containerMapRef = useRef<HTMLDivElement>(null);
  const map = useMap({containerMapRef: containerMapRef, location: cityPoint.location});
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([cityPoint.location.latitude, cityPoint.location.longitude], cityPoint.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [cityPoint, map]);


  useEffect((): void => {
    if (map) {
      currentOffers.forEach((currentOffer) => {
        leaflet
          .marker({
            lat: currentOffer.location.latitude,
            lng: currentOffer.location.longitude,
          }, {
            icon: currentOffer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(markerLayer.current);
      });
    }
  }, [activeOfferId, map, currentOffers]);

  return (
    <div className="cities__right-section">
      <section className="cities__map map">
        <div
          style={{height: '500px'}}
          ref={containerMapRef}
        >
        </div>
      </section>
    </div>
  );
}
