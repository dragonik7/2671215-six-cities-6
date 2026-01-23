// src/pages/favorites/FavoritesPage.tsx

import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/Header';
import CardInfo from '../../components/CardInfo.tsx';
import {getFavorites} from '../../services/offers';
import {Offer} from '../../types/types.ts';

function FavoritesPage(): JSX.Element {
  const [favorites, setFavorites] = useState<Offer[]>([]);
  const token = localStorage.getItem('token') ?? '';

  useEffect(() => {
    getFavorites(token).then(setFavorites);
  }, [token]);

  const citiesMap = favorites.reduce<Record<string, Offer[]>>((acc, item) => {
    const city = item.city.name;
    acc[city] = acc[city] ? [...acc[city], item] : [item];
    return acc;
  }, {});

  const cityNames = Object.keys(citiesMap);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            {cityNames.map((city) => (
              <ul key={city} className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link to="#" className="locations__item-link">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="favorites__places">
                    {citiesMap[city].map((item) => (
                      <CardInfo
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        previewImage={item.previewImage}
                        type={item.type}
                        city={item.city}
                        location={item.location}
                        rating={item.rating * 20}
                        isPremium={item.isPremium}
                        isFavorite={item.isFavorite}
                        isActive={false}
                        onMouseEnter={() => {
                        }}
                        onMouseLeave={() => {
                        }}
                      />
                    ))}
                  </div>
                </li>
              </ul>
            ))}
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Link to="/" className="footer__logo-link">
          <img
            className="footer__logo"
            src="/img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
