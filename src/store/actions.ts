// src/store/actions.ts
import { Offer } from '../types/types';

export function setCity(city: string) {
  return { type: 'SET_CITY', payload: city };
}

export function setOffers(offers: Offer[]) {
  return { type: 'SET_OFFERS', payload: offers };
}
