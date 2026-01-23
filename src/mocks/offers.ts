// src/mocks/offers.ts
export interface Offer {
  id: string;
  name: string;
  city: string;
  price: number;
  image: string;
  type: 'Apartment' | 'Room';
  rating?: number;
  isPremium?: boolean;
  bookmarked?: boolean;
}
export interface ListOffer {
  offers: Offer[];
}

export const offers: Offer[] = [
  {
    id: 'offer-1',
    name: 'Cozy studio in the heart of Paris',
    city: 'Paris',
    price: 90,
    image: 'img/apartment-02.jpg',
    type: 'Apartment',
    rating: 85,
    isPremium: true,
    bookmarked: false
  },
  {
    id: 'offer-2',
    name: 'Modern loft near the river',
    city: 'Amsterdam',
    price: 120,
    image: 'img/apartment-01.jpg',
    type: 'Apartment',
    rating: 90,
    isPremium: false,
    bookmarked: true
  },
  {
    id: 'offer-3',
    name: 'Rustic cottage with garden',
    city: 'Brussels',
    price: 75,
    image: 'img/room.jpg',
    type: 'Room',
    rating: 80,
    isPremium: false,
    bookmarked: false
  },
  {
    id: 'offer-4',
    name: 'Luxury penthouse with skyline view',
    city: 'Hamburg',
    price: 200,
    image: 'img/apartment-03.jpg',
    type: 'Apartment',
    rating: 95,
    isPremium: true,
    bookmarked: true
  }
];
