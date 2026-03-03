import { CityName } from './const';

export type ListOffer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
        name: CityName;
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


export type ListOffers = ListOffer[]

export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
        name: CityName;
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

export type Offers = Offer[]

export type Nullable<T> = T | null | undefined;

export type City = {
  name: CityName;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type Cities = City[];

export type UserComment = {
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

export type UserComments = UserComment[];
