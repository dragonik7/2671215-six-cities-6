import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, OfferFull, Review } from '../types/types';

interface OfferState {
  offer: OfferFull | null;
  reviews: Review[];
  nearbyOffers: Offer[];
  loading: boolean;
  error: string | null;
}

const initialState: OfferState = {
  offer: null,
  reviews: [],
  nearbyOffers: [],
  loading: false,
  error: null,
};

export const fetchOffer = createAsyncThunk<
    { offer: OfferFull; reviews: Review[]; nearby: Offer[] },
    string,
    { extra: AxiosInstance }
>('offer/fetchOffer', async (id, { extra: api }) => {
  const [offer, reviews, nearby] = await Promise.all([
    api.get<OfferFull>(`/six-cities/offers/${id}`).then((res) => res.data),
    api.get<Review[]>(`/six-cities/comments/${id}`).then((res) => res.data),
    api.get<Offer[]>(`/six-cities/offers/${id}/nearby`).then((res) => res.data),
  ]);
  return { offer, reviews, nearby };
});

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    clearOffer: (state) => {
      state.offer = null;
      state.reviews = [];
      state.nearbyOffers = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offer = action.payload.offer;
        state.reviews = action.payload.reviews;
        state.nearbyOffers = action.payload.nearby;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load offer';
      });
  },
});

export const { clearOffer } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
