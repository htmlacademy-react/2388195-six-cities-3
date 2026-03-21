import { RequestStatus } from '../../const';
import { selectStatus } from '../../store/slices/offers-slice';
import { useAppSelector } from '../../hooks/store-hooks';
import { useSelector } from 'react-redux';
import { selectFavoriteOffers } from '../../store/slices/favorite-slice';
import { ReactNode } from 'react';
import Header from '../header';
import classNames from 'classnames';

interface LayoutProps {
  isPageMain?: boolean;
  isPageLogin?: boolean;
  isPageFavouriteEmpty?: boolean;
  children: ReactNode;
}

export default function Layout({
  children,
  isPageMain,
  isPageLogin,
  isPageFavouriteEmpty,
}: LayoutProps): JSX.Element | ReactNode {
  const favouriteCount = useSelector(selectFavoriteOffers).length;
  const status = useAppSelector(selectStatus);

  if (status === RequestStatus.Loading) {
    return children;
  }

  return (
    <div
      className={classNames(
        'page',
        { 'page--gray page--main': isPageMain },
        { 'page--gray page--login': isPageLogin },
        { 'page--favorites-empty': isPageFavouriteEmpty },
      )}
    >
      <Header
        favouriteCount={favouriteCount}
        typeLogo={'header'}
        isPageMain={isPageMain}
        isPageLogin={isPageLogin}
      />
      {children}
    </div>
  );
}
