import React from 'react';
import ReactDOM from 'react-dom/client';
import MainScreen from './pages/main/Main.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const listings = [
  {
    name: 'Beautiful & luxurious apartment at great location',
    price: 120,
    image: 'img/apartment-01.jpg',
    type: 'Apartment' as const,
    rating: 80,
    isPremium: true,
    bookmarked: false,
  },
  {
    name: 'Wood and stone place',
    price: 80,
    image: 'img/room.jpg',
    type: 'Room' as const,
    rating: 80,
    isPremium: false,
    bookmarked: true,
  },
  {
    name: 'Canal View Prinsengracht',
    price: 132,
    image: 'img/apartment-02.jpg',
    type: 'Apartment' as const,
    rating: 80,
    isPremium: false,
    bookmarked: false,
  },
  {
    name: 'Nice, cozy, warm big bed apartment',
    price: 180,
    image: 'img/apartment-03.jpg',
    type: 'Apartment' as const,
    rating: 100,
    isPremium: true,
    bookmarked: false,
  },
];
root.render(
  <React.StrictMode>
    <MainScreen listings={listings}></MainScreen>
  </React.StrictMode>
);
