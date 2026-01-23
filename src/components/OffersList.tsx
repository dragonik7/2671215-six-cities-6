// src/components/OffersList.tsx
import CardInfo from './CardInfo';
import {Offer} from '../types/types.ts';

interface OffersListProps {
  offers: Offer[];
  activeOffer : (Offer | null);
  setActiveOffer: (offer: Offer | null) => void;
}

function OffersList({offers, activeOffer, setActiveOffer}: OffersListProps): JSX.Element {
  const handleMouseEnter = (offer: Offer): void => {
    setActiveOffer(offer);
  };

  const handleMouseLeave = (): void => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CardInfo
          key={offer.id}
          {...offer}
          isActive={offer === activeOffer}
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
