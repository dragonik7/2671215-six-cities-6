// src/services/offers.ts

import {api} from './api';
import {Offer, OfferFull} from '../types/types.ts';

export const getOffers = async (): Promise<Offer[]> => {
  const {data} = await api.get<Offer[]>('/six-cities/offers');
  return data;
};

export const getOfferById = async (id: string): Promise<OfferFull> => {
  const {data} = await api.get<OfferFull>(`/six-cities/offers/${id}`);
  return data;
};
export const getOffersNearby = async (id: string): Promise<Offer> => {
  const {data} = await api.get<OfferFull>(`/six-cities/offers/${id}/nearby`);
  return data;
};

export const getFavorites = async (token: string): Promise<Offer[]> => {
  const {data} = await api.get<Offer[]>('/six-cities/favorite', {
    headers: {
      'X-Token': token,
    },
  });
  return data;
};
