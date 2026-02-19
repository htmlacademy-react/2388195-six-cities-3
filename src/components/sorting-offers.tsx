import { useState } from 'react';
import { SortType } from '../const';


type SortingOffersProp = {
  onChangeSort: (type: SortType) => void;
  currentSortType: SortType;
}

export default function SortingOffers({onChangeSort, currentSortType}: SortingOffersProp): JSX.Element {

  const [isOpened, setIsOpened] = useState(false);

  const handleTypeClick = () => {
    setIsOpened((prev) => !prev);
  };

  const handleOptionClick = (type: SortType) => {
    onChangeSort(type);
    setIsOpened(false);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === 'Escape') {
      setIsOpened(false);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get" onKeyDown={handleKeyDown}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpened}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter' || evt.key === ' ') {
            evt.preventDefault();
            handleTypeClick();
          }
        }}
      >
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
            role="option"
            aria-selected={type === currentSortType}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter' || evt.key === ' ') {
                evt.preventDefault();
                handleOptionClick(type);
              }
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}
