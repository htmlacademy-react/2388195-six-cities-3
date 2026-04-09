import { RequestStatus } from '@/const';
import { useAppSelector } from '@/hooks/store-hooks';
import { selectFavoriteOffers } from '@/store/slices/favorite-slice';
import { selectStatus } from '@/store/slices/offers-slice';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Header from './header';

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
