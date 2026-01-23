// src/pages/main/MainPage.tsx

import {useEffect, useState} from 'react';
import Header from '../../components/Header.tsx';
import OffersList from '../../components/OffersList.tsx';
import {getOffers} from '../../services/offers';
import {Offer} from '../../types/types.ts';
import Map from '../../components/Map.tsx';
import {getLocations} from '../../utils/UtilOffer.ts';

function MainPage(): JSX.Element {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOffers()
      .then(setOffers)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const locations = getLocations(offers);
  const city = offers[0]?.city;

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          {!isLoading && (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                  Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={1}>Price: low to high</li>
                    <li className="places__option" tabIndex={2}>Price: high to low</li>
                    <li className="places__option" tabIndex={3}>Top rated first</li>
                  </ul>
                </form>
                <OffersList offers={offers} activeOffer={activeOffer} setActiveOffer={setActiveOffer}/>
              </section>

              <section className="cities__right-section" style={{paddingTop: '29px'}}>
                <Map
                  city={city}
                  locations={locations}
                  selectedPoint={activeOffer?.location}
                />
              </section>
            </div>)}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
