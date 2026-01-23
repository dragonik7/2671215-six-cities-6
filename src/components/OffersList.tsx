// src/components/OffersList.tsx
import {useState} from 'react';
import CardInfo from './CardInfo';
import {ListOffer} from '../mocks/offers.ts';

function OffersList({offers}: ListOffer) {
  // @typescript-eslint/no-unused-vars
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CardInfo
          key={offer.id}
          {...offer}
          isActive={offer.id === activeOfferId}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;
