import { useState } from 'react';
import { SortType } from '../const';

interface SortingOffersProps {
  onChangeSort: (type: SortType) => void;
  currentSortType: SortType;
}

export default function SortingOffers({
  onChangeSort,
  currentSortType,
}: SortingOffersProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleTypeClick = () => {
    setIsOpened((prev) => !prev);
  };

  const handleOptionClick = (type: SortType) => {
    onChangeSort(type);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleTypeClick} role="button">
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}
        role="listbox"
      >
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={`places__option ${type === currentSortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}
