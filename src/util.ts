import { MIN_STAR_WIDTH, SortType } from './const';
import { TListOffers } from './types';
import type {CITIES, TCityName} from'./const';


export default function getRandomCity (array: typeof CITIES) : TCityName {
  return array[Math.floor(Math.random() * array.length)].name;
}

export function getStarActiveWidth (rating: number): string {
  return `${MIN_STAR_WIDTH * rating}%`;
}

export function getNearOffers (offers: TListOffers, city: string | undefined, id: string | null): TListOffers {
  const MAX_NEAR_OFFERS = 3;
  const nearOffers: TListOffers = [];

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


export const getSortedOffers = (offers: TListOffers, type: SortType) => {
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
