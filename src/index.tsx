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

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<PrivateRoute />}>
          <Route index element={<FavoritesPage/>} />
        </Route>
        <Route path="/offer/:id" element={<OfferPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
