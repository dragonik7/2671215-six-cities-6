// src/store/reducer.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/types';
import { AxiosInstance } from 'axios';

export interface AppState {
  city: string;
  offers: Offer[];
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  city: 'Paris',
  offers: [],
  loading: false,
  error: null,
};

export const fetchOffers = createAsyncThunk<
    Offer[],
    void,
    { extra: AxiosInstance }
>(
  'app/fetchOffers',
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/six-cities/offers');
    return data;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load offers';
      });
  },
});

export const { setCity, setOffers } = appSlice.actions;
export const appReducer = appSlice.reducer;
