// src/store/reducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/types';

export interface AppState {
  city: string;
  offers: Offer[];
}

const initialState: AppState = {
  city: 'Paris',
  offers: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
  },
});

export const { setCity, setOffers } = appSlice.actions;
export const appReducer = appSlice.reducer;
