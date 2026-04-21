import { SortType } from '@/const';
import classNames from 'classnames';
import { memo } from 'react';

interface SortingOptionProps {
  sortType: SortType;
  currentSortType: SortType;
  handleOptionClick: (type: SortType) => void;
}

function SortingOption({
  sortType,
  currentSortType,
  handleOptionClick,
}: SortingOptionProps): JSX.Element {
  return (
    <li
      className={classNames(
        'places__option',
        sortType === currentSortType && 'places__option--active',
      )}
      tabIndex={0}
      onClick={() => handleOptionClick(sortType)}
    >
      {sortType}
    </li>
  );
}

const MemoizedSortingOption = memo(SortingOption);
export default MemoizedSortingOption;
