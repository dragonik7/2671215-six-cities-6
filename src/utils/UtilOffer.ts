// src/utils/UtilOffer.ts
import {Offer} from '../types/types.ts';

export function getLocations(offers: Offer[]): Offer['location'][] {
  return offers.map((offer) => offer.location);
}
