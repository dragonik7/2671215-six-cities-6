// src/pages/favorites/FavoritesPage.tsx
import Header from '../../components/Header';
import {Offer, OfferFull, Review} from '../../types/types';
import {useEffect, useState} from 'react';
import {getComments, getOfferById, getOffersNearby} from '../../services/offers';
import {useLocation, useParams} from 'react-router-dom';
import Map from '../../components/Map';
import OffersList from '../../components/OffersList';
import ReviewsList from '../../components/ReviewList.tsx';
import ReviewForm from '../../components/ReviewForm.tsx';

function OfferPage(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const [offer, setOffer] = useState<OfferFull | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nearbyOffers, setNearbyOffers] = useState<Offer[]>([]);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [isLoadingOffer, setIsLoadingOffer] = useState<boolean>(true);
  const {pathname} = useLocation();

  const mapStyle: React.CSSProperties = {
    width: '100%',
    height: '600px',
    borderRadius: '10px'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (!id) {
      return;
    }

    Promise.all([getOfferById(id), getComments(id), getOffersNearby(id)])
      .then(([offerData, commentsData, nearbyData]) => {
        setOffer(offerData);
        setReviews(commentsData);
        setNearbyOffers(nearbyData);
      })
      .finally(() => setIsLoadingOffer(false));
  }, [id]);

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <div className="page">
      <Header hideUser/>
      <main className="page__main page__main--offer">
        <section className="offer" style={{paddingBottom: '100px'}}>
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={offer.title}/>
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              <div>
                {!isLoadingOffer ?
                  <>
                    {offer.isPremium && (
                      <div className="offer__mark">
                        <span>Premium</span>
                      </div>
                    )}

                    <div className="offer__name-wrapper">
                      <h1 className="offer__name">{offer.title}</h1>
                      <button
                        className={`place-card__bookmark-button ${
                          offer.isFavorite ? 'place-card__bookmark-button--active' : ''
                        } button`}
                        type="button"
                      >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">
                          {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                        </span>
                      </button>
                    </div>

                    <div className="offer__rating rating">
                      <div className="offer__stars rating__stars">
                        <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                      <span className="offer__rating-value rating__value">{offer.rating}</span>
                    </div>

                    <ul className="offer__features">
                      <li className="offer__feature offer__feature--entire">{offer.type}</li>
                      <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                      <li className="offer__feature offer__feature--adults">
                            Max {offer.maxAdults} adults
                      </li>
                    </ul>

                    <div className="offer__price">
                      <b className="offer__price-value">&euro;{offer.price}</b>
                      <span className="offer__price-text">&nbsp;night</span>
                    </div>

                    <div className="offer__inside">
                      <h2 className="offer__inside-title">What&apos;s inside</h2>
                      <ul className="offer__inside-list">
                        {offer.goods.map((good) => (
                          <li key={good} className="offer__inside-item">
                            {good}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="offer__host">
                      <h2 className="offer__host-title">Meet the host</h2>
                      <div className="offer__host-user user">
                        <div
                          className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper"
                        >
                          <img
                            className="offer__avatar user__avatar"
                            src={offer.host.avatarUrl}
                            width="74"
                            height="74"
                            alt={offer.host.name}
                          />
                        </div>
                        <span className="offer__user-name">{offer.host.name}</span>
                        {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                      </div>
                      <div className="offer__description">
                        <p className="offer__text">{offer.description}</p>
                      </div>
                    </div>
                  </> : <div>...Loading</div>}
              </div>
              <ReviewsList reviews={reviews}/>
              <ReviewForm/>

            </div>
          </div>
        </section>
        <Map
          offers={[offer, ...nearbyOffers]}
          mapStyle={mapStyle}
          selectedPoint={activeOffer?.location ?? offer.location}
          city={offer.city}
        />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={nearbyOffers}
                activeOffer={activeOffer}
                setActiveOffer={setActiveOffer}
              />
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}

export default OfferPage;
