import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';
import { useAppDispatch } from '../hooks/store-hooks';
import { useAuth } from '../hooks/user-auth-hook';
import { postFavorite } from '../store/thunk/favorite';
import { FullOffer } from '../types/offer';

interface FavoriteButtonProps {
  offerId: FullOffer['id'];
  isFavorite: FullOffer['isFavorite'];
  block: 'place-card' | 'offer';
}

export default function FavoriteButton({
  block,
  offerId,
  isFavorite,
}: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAuth();
  const navigate = useNavigate();

  const favoriteButtonHandler = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
    }
    const favoriteStatus = Number(!isFavorite);
    dispatch(postFavorite({ offerId, favoriteStatus }));
  };

  const bookmarkIconWidth = block === 'place-card' ? '18' : '31';
  const bookmarkIconHeight = block === 'place-card' ? '19' : '33';

  return (
    <button
      className={`${block}__bookmark-button  button ${isFavorite ? `${block}__bookmark-button--active` : ''}`}
      type="button"
      onClick={favoriteButtonHandler}
    >
      <svg
        className={`${block}__bookmark-icon`}
        width={bookmarkIconWidth}
        height={bookmarkIconHeight}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}
