import { TCity } from './types';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const CITIES_POINTS: TCity[] = [
  { name: 'Paris',
    location: {
      latitude: 40.835292,
      longitude: -73.916236,
      zoom: 10,
    }
  },
  { name: 'Cologne',
    location: {
      latitude: 40.835292,
      longitude: -73.916236,
      zoom: 10,
    }
  },
  { name: 'Brussels',
    location: {
      latitude: 40.835292,
      longitude: -73.916236,
      zoom: 10,
    }
  },
  { name: 'Amsterdam',
    location: {
      latitude: 40.835292,
      longitude: -73.916236,
      zoom: 10,
    }
  },
  { name: 'Hamburg',
    location: {
      latitude: 40.835292,
      longitude: -73.916236,
      zoom: 10,
    }
  },
  { name: 'Dusseldorf',
    location: {
      latitude: 40.835292,
      longitude: -73.916236,
      zoom: 10,
    }
  },
];


export const Setting = {
  FAVOURITE_COUNT: 3,
  USER_NAME: 'Oliver.conner@gmail.com',
  DEFAULT_CITY: 'Paris',
} as const;

export const RATING = [
  {value: 5, label: 'perfect'},
  {value: 4, label: 'good'},
  {value: 3, label: 'not bad'},
  {value: 2, label: 'badly'},
  {value: 1, label: 'terribly'},
];

export const MIN_STAR_WIDTH: number = 20;

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_CURRENT = './img/pin-active.svg';
