import { SortType } from "@/const";
import { ListOffers, CityName } from "@/types/offer";
import { getSortedOffers } from "@/util";
import { useState } from "react";
import PlaceCard from "./place-card";
import SortingOffers from "./sorting-offers";


interface MainPlacesProps {
  currentOffers: ListOffers;
  currentCity: CityName;
}

export default function MainPlaces({ currentOffers, currentCity }: MainPlacesProps): JSX.Element {
  const formatedOffersNumber = (count: number): string => `${count} place${count !== 1 && 's'}`;
  const [activeSort, setActiveSort] = useState(SortType.Popular);
  const sortedOffers = getSortedOffers(currentOffers, activeSort);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {formatedOffersNumber(currentOffers.length)} to stay in {currentCity}
      </b>
      <SortingOffers currentSortType={activeSort} onChangeSort={setActiveSort} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((currentOffer) => (
          <PlaceCard key={currentOffer.id} currentOffer={currentOffer} cardType="cities" hovered />
        ))}
      </div>
    </section>
  );
}
