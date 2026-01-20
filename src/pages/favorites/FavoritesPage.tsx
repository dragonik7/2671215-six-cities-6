import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import CardInfo, {CardInfoProps, CardList} from '../../components/CardInfo.tsx';

function FavoritesPage({listings}: CardList): JSX.Element {
  const citiesMap = listings.reduce<Record<string, CardInfoProps[]>>(
    (acc, item) => {
      acc[item.city] = acc[item.city]
        ? [...acc[item.city], item]
        : [item];
      return acc;
    },
    {}
  );
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

                  {/* Карточки в этом городе */}
                  <div className="favorites__places">
                    {citiesMap[city].map((item) => (
                      <CardInfo key={item.id} {...item} />
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
