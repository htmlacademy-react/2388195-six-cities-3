import { MIN_STAR_WIDTH } from './const';
import { TOffer, TOffers } from './types';

export default function randomiseCity (array: string[]) : string {
  return array[Math.floor(Math.random() * array.length)];
}

export function getStarActiveWidth (rating: number): string {
  return `${MIN_STAR_WIDTH * rating}%`;
}

export function getNearOffers (offers: TOffers, offer: TOffer): TOffers {
  const MAX_NEAR_OFFERS = 3;
  const nearOffers: TOffers = [];

  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id !== offer.id && offers[i].city.name === offer.city.name) {
      nearOffers.push(offers[i]);
    }
    if (nearOffers.length >= MAX_NEAR_OFFERS) {
      break;
    }
  }
  return nearOffers;
}
