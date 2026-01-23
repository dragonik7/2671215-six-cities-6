// src/components/CardInfo.tsx
import {Link} from 'react-router-dom';
import {Offer} from '../mocks/offers.ts';

interface CardInfoProps extends Offer {
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function CardInfo({
  id,
  name,
  price,
  image,
  type,
  rating,
  isPremium,
  bookmarked,
  isActive,
  onMouseEnter,
  onMouseLeave
}: CardInfoProps): JSX.Element {
  return (
    <article
      className={`cities__card place-card ${isActive ? 'place-card--active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={image} width="260" height="200" alt={name}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${bookmarked ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating ?? 0}%`}}/>
          </div>
        </div>
        <h2 className="place-card__name"><Link to={`/offer/${id}`}>{name}</Link></h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default CardInfo;
