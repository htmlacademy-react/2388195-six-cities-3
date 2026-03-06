import { CityName } from '../const';

export type City = {
  name: CityName;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type Cities = City[];
