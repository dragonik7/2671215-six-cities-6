// src/components/Sorting.tsx
import { useState } from 'react';

type SortingOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

interface SortingProps {
  currentSort: SortingOption;
  onSortChange: (sort: SortingOption) => void;
}

function Sorting({ currentSort, onSortChange }: SortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: SortingOption[] = [
    'Popular',
    'Price: low to high',
    'Price: high to low',
    'Top rated first'
  ];

  const handleSortClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: SortingOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by: </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortClick}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {sortOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${currentSort === option ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
export type { SortingOption };
