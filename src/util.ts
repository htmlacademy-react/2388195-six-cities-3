import { MIN_STAR_WIDTH } from './const';

export default function randomiseCity (array: string[]) : string {
  return array[Math.floor(Math.random() * array.length)];
}

export function getStarActiveWidth (rating: number): string {
  return `${MIN_STAR_WIDTH * rating}%`;
}
