import { AppRoute } from "@/const";
import { useAppDispatch } from "@/hooks/store-hooks";
import { useAuth } from "@/hooks/user-auth-hook";
import { postFavorite } from "@/store/thunk/favorite";
import { FullOffer } from "@/types/offer";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

interface FavoriteButtonProps {
  offerId: FullOffer['id'];
  isFavorite: FullOffer['isFavorite'];
  buttonType: 'place-card' | 'offer';
}
const sizes = {
  'place-card': {
    width: 18,
    height: 19,
  },
  offer: {
    width: 31,
    height: 33,
  },
};

export default function FavoriteButton({
  buttonType,
  offerId,
  isFavorite,
}: FavoriteButtonProps): JSX.Element {
  const { width, height } = sizes[buttonType];
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

  return (
    <button
      className={classNames(`${buttonType}__bookmark-button`, 'button', {
        [`${buttonType}__bookmark-button--active`]: isFavorite,
      })}
      type="button"
      onClick={favoriteButtonHandler}
    >
      <svg className={`${buttonType}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}
