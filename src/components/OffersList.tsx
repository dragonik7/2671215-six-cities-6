// src/components/OffersList.tsx
import {useState} from 'react';
import CardInfo from './CardInfo';
import {ListOffer} from '../mocks/offers.ts';

function OffersList({offers}: ListOffer) {
  // @typescript-eslint/no-unused-vars
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = (id: string): void => setActiveOfferId(id);
  const handleMouseLeave = (): void => setActiveOfferId(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CardInfo
          key={offer.id}
          {...offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
