// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './reducer';
import {api} from '../services/api.ts';
import {offerReducer} from './offer-slice.ts';

export const store = configureStore({
  reducer: {
    app: appReducer,
    offer: offerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
