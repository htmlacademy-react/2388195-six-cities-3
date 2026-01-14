import { TOffers } from '../types';

export const OFFERS: TOffers = [{
  'id': '1',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': {
    'name': 'Paris',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }
  },
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': true,
  'isPremium': false,
  'rating': 5,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Paris.',
  'bedrooms': 3,
  'goods': [
    'Heating', 'Conditioning', 'Towels'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': 'img/avatar-angelina.jpg',
    'isPro': true
  },
  'images': [
    'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'
  ],
  'maxAdults': 4
},
{
  'id': '2',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': {
    'name': 'Paris',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }
  },
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': false,
  'isPremium': false,
  'rating': 4,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'bedrooms': 3,
  'goods': [
    'Heating'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': 'img/avatar-angelina.jpg',
    'isPro': false
  },
  'images': [
    'img/apartment-01.jpg'
  ],
  'maxAdults': 4
},
{
  'id': '3',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }
  },
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': false,
  'isPremium': false,
  'rating': 4,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'bedrooms': 3,
  'goods': [
    'Heating'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': 'img/avatar-angelina.jpg',
    'isPro': false
  },
  'images': [
    'img/apartment-01.jpg'
  ],
  'maxAdults': 4
}
];
