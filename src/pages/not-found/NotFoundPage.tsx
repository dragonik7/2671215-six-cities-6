import {Link} from 'react-router-dom';
import Header from '../../components/Header.tsx';
import CitiesList from '../../components/CitiesList.tsx';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={['Paris','Cologne','Brussels','Amsterdam','Hamburg','Dusseldorf']}/>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in
                Dusseldorf
                </p>
                <div className="cities__status-actions">
                  <Link to="/" className="button button--primary"> Back to Home </Link>
                </div>
              </div>
            </section>

            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
