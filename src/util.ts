import { CITIES, MIN_STAR_WIDTH, SortType } from "./const";
import { CityName, ListOffers } from "./types/offer";

export default function getRandomCity(array: typeof CITIES): CityName {
  return array[Math.floor(Math.random() * array.length)].name;
}

export function getStarActiveWidth(rating: number): string {
  return `${MIN_STAR_WIDTH * rating}%`;
}

export function getNearOffers(
  offers: ListOffers,
  city: string | undefined,
  id: string | null,
): ListOffers {
  const MAX_NEAR_OFFERS = 3;
  const nearOffers: ListOffers = [];

  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id !== id && offers[i].city.name === city) {
      nearOffers.push(offers[i]);
    }
    if (nearOffers.length >= MAX_NEAR_OFFERS) {
      break;
    }
  }

  return nearOffers;
}

export const getSortedOffers = (offers: ListOffers, type: SortType) => {
  switch (type) {
    case SortType.LowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.HighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export const formatedType = (formatType: string): string =>
  formatType ? formatType[0].toUpperCase() + formatType.slice(1) : '';
