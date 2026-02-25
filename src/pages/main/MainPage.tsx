// src/pages/main/MainPage.tsx

import {useEffect, useState} from 'react';
import {RootState} from '../../store';
import Header from '../../components/Header.tsx';
import CitiesList from '../../components/CitiesList.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {setOffers} from '../../store/reducer';
import OffersList from '../../components/OffersList.tsx';
import {getOffers} from '../../services/offers';
import {Offer} from '../../types/types.ts';
import Map from '../../components/Map.tsx';

function MainPage(): JSX.Element {
  const offersAll = useSelector((state: RootState) => state.app.offers);
  const city = useSelector((state: RootState) => state.app.city);
  const dispatch = useDispatch();
  const offers = offersAll.filter((o) => o.city.name === city);

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapStyle: React.CSSProperties = {
    width: '500px',
    height: '682px',
    borderRadius: '10px'
  };

  useEffect(() => {
    getOffers()
      .then((data) => dispatch(setOffers(data)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={['Paris','Cologne','Brussels','Amsterdam','Hamburg','Dusseldorf']}/>
        <div className="cities">
          {!isLoading && (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {city}</b>
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
                  mapStyle={mapStyle}
                  offers={offers}
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
