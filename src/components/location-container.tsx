import { City, Cities } from "@/types/offer";
import LocationContainerItem from "./location-container-item";


interface LocationContainerProps {
  currentCity: City;
  cities: Cities;
}

export default function LocationContainer({
  cities,
  currentCity,
}: LocationContainerProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <LocationContainerItem city={city} key={city.name} currentCity={currentCity} />
        ))}
      </ul>
    </section>
  );
}
