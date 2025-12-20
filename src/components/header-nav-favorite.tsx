import { AppRoute } from '../const';
import { Link } from 'react-router-dom';


type HeaderNavFavoriteProp = {
  userName: string;
  favouriteCount: number;
}

export default function HeaderNavFavorite({userName, favouriteCount}: HeaderNavFavoriteProp): JSX.Element {
  return (
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">{userName}</span>
      <span className="header__favorite-count">{favouriteCount}</span>
    </Link>
  );
}
