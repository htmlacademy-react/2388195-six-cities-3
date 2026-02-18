import { TCityName } from './const';

export type TListOffer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
        name: TCityName;
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
    };
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
  }


export type TListOffers = TListOffer[]

export type TOffer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
        name: TCityName;
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
    };
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: string[];
    host: {
        name: string;
        avatarUrl: string;
        isPro: boolean;
    };
    images: string[];
    maxAdults: number;
}

export type TOffers = TOffer[]

export type Nullable<T> = T | null | undefined;

export type TCity = {
  name: TCityName;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type TCities = {
  name: TCityName;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}[];

export type TComment = {
  id: string;
  date: string;
  user: {
      name: string;
      avatarUrl: string;
      isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type TComments = {
  id: string;
  date: string;
  user: {
      name: string;
      avatarUrl: string;
      isPro: boolean;
  };
  comment: string;
  rating: number;
}[];
