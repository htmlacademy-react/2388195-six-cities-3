import { useEffect, useRef } from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ListOffers } from '../../types';
import useMap from './use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, CITIES, CityName} from '../../const';

type CitiesMapProps = {
  className?: string;
  currentCity: CityName;
  currentOffers: ListOffers;
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

export default function CitiesMap({className, currentCity, currentOffers, activeOfferId}: CitiesMapProps): JSX.Element {

  const containerMapRef = useRef<HTMLElement>(null);
  const city = CITIES.find((item)=> item.name === currentCity)!;
  const map = useMap({containerMapRef, location: city.location});
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);


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
    <section className={`map ${className}`} ref={containerMapRef}>
    </section>
  );
}


////////////////////////////////////////
// import { useEffect, useRef } from 'react';
// import leaflet, { LayerGroup } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { ListOffers } from '../../types';
// import useMap from './use-map';
// import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, CITIES, CityName} from '../../const';
// // import { useAppSelector } from '../../hooks/store';
// // import { offersSelectors } from '../../store/slices/offers';

// type CitiesMapProps = {
//   className?: string;
//   currentCity: CityName;
//   currentOffers: ListOffers;
//   activeOfferId?: string | null;
// }

// const defaultCustomIcon = leaflet.icon({
//   iconUrl: URL_MARKER_DEFAULT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

// const currentCustomIcon = leaflet.icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

// export default function CitiesMap({className, currentCity, currentOffers, activeOfferId}: CitiesMapProps): JSX.Element {
//   // const activeId = useAppSelector(offersSelectors.activeId);

//   const containerMapRef = useRef<HTMLElement>(null);
//   const city = CITIES.find((item)=> item.name === currentCity)!;
//   // const city = currentOffers.find((item)=> item.city.name === currentCity)!;
//   const map = useMap({containerMapRef: containerMapRef, location: city.location});
//   const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

//   useEffect(() => {
//     if (map) {
//       map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
//       markerLayer.current.addTo(map);
//       markerLayer.current.clearLayers();
//     }
//   }, [city, map]);


//   useEffect((): void => {
//     if (map) {
//       currentOffers.forEach((currentOffer) => {
//         leaflet
//           .marker({
//             lat: currentOffer.location.latitude,
//             lng: currentOffer.location.longitude,
//           }, {
//             icon: currentOffer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
//           })
//           .addTo(markerLayer.current);
//       });
//     }
//   }, [activeOfferId, map, currentOffers]);

//   return (
//     <section className={`map ${className}`} ref={containerMapRef}>
//     </section>
//   );
// }
