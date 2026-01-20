import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from './pages/not-found/NotFoundPage.tsx';
import LoginPage from './pages/login/LoginPage.tsx';
import MainPage from './pages/main/MainPage.tsx';
import OfferPage from './pages/offer/OfferPage.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import FavoritesPage from './pages/favorites/FavoritesPage.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const listings = [
  {
    id: 'apartment-1',
    name: 'Beautiful & luxurious apartment at great location',
    city: 'Amsterdam',
    price: 120,
    image: 'img/apartment-01.jpg',
    type: 'Apartment' as const,
    rating: 80,
    isPremium: true,
    bookmarked: true,
  },
  {
    id: 'apartment-2',
    name: 'Wood and stone place',
    city: 'Amsterdam',
    price: 80,
    image: 'img/room.jpg',
    type: 'Room' as const,
    rating: 80,
    isPremium: false,
    bookmarked: true,
  },
  {
    id: 'apartment-3',
    name: 'Canal View Prinsengracht',
    city: 'Amsterdam',
    price: 132,
    image: 'img/apartment-02.jpg',
    type: 'Apartment' as const,
    rating: 80,
    isPremium: false,
    bookmarked: true,
  },
  {
    id: 'apartment-4',
    name: 'Nice, cozy, warm big bed apartment',
    price: 180,
    city: 'Amsterdam',
    image: 'img/apartment-03.jpg',
    type: 'Apartment' as const,
    rating: 100,
    isPremium: true,
    bookmarked: false,
  },
];
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage listings={listings}/>} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/favorites" element={<PrivateRoute />}>
          <Route index element={<FavoritesPage listings={listings}/>} />
        </Route>

        <Route path="/offer/:id" element={<OfferPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
