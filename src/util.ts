import { MIN_STAR_WIDTH } from './const';
import { TListOffers } from './types';
import type {CITIES, TCityName} from'./const';


export default function getRandomCity (array: typeof CITIES) : TCityName {
  return array[Math.floor(Math.random() * array.length)].name;
}

export function getStarActiveWidth (rating: number): string {
  return `${MIN_STAR_WIDTH * rating}%`;
}

export function getNearOffers (offers: TListOffers, city: string | undefined, id: string | undefined): TListOffers {
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
