import { useEffect, useState, useMemo } from 'react';
import { RootState } from '../../store';
import Header from '../../components/Header.tsx';
import CitiesList from '../../components/CitiesList.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { setOffers } from '../../store/reducer';
import OffersList from '../../components/OffersList.tsx';
import { getOffers } from '../../services/offers';
import { Offer, City } from '../../types/types.ts';
import Map from '../../components/Map.tsx';
import Sorting, { SortingOption } from '../../components/Sorting.tsx';

function MainPage(): JSX.Element {
  const offersAll = useSelector((state: RootState) => state.app.offers);
  const cityName = useSelector((state: RootState) => state.app.city);
  const dispatch = useDispatch();

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState<SortingOption>('Popular');

  useEffect(() => {
    setActiveOffer(null);
  }, [cityName]);

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

  const filteredOffers = useMemo(() =>
    offersAll.filter((o) => o.city.name === cityName),
  [offersAll, cityName]
  );

  const currentCity: City | null = useMemo(() => {
    const found = offersAll.find((o) => o.city.name === cityName);
    return found ? found.city : null;
  }, [offersAll, cityName]);

  const sortedOffers = useMemo(() => {
    const offersCopy = [...filteredOffers];

    switch (currentSort) {
      case 'Price: low to high':
        return offersCopy.sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return offersCopy.sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return offersCopy.sort((a, b) => b.rating - a.rating);
      case 'Popular':
      default:
        return offersCopy;
    }
  }, [filteredOffers, currentSort]);

  const handleSortChange = (sort: SortingOption) => {
    setCurrentSort(sort);
  };

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
                <b className="places__found">{sortedOffers.length} places to stay in {cityName}</b>
                <Sorting currentSort={currentSort} onSortChange={handleSortChange} />
                <OffersList
                  offers={sortedOffers}
                  activeOffer={activeOffer}
                  setActiveOffer={setActiveOffer}
                />
              </section>

              <section className="cities__right-section" style={{paddingTop: '29px'}}>
                {currentCity && (
                  <Map
                    mapStyle={mapStyle}
                    city={currentCity}
                    offers={filteredOffers}
                    selectedPoint={activeOffer?.location}
                  />
                )}
              </section>
            </div>)}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
