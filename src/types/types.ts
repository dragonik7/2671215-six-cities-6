// src/types/types.ts
export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface City {
  name: string;
  location: Location;
}

export interface Host {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export interface OfferFull extends Offer {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export interface Review {
  id: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}

export interface AuthInfoWithToken {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}
