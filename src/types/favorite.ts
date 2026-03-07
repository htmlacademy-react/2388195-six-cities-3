import { CityName } from '../const';

export type FavoriteOffer = {
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

export type FavoriteOffers = FavoriteOffer[];
