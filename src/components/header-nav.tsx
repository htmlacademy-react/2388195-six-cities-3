import HeaderNavFavorite from './header-nav-favorite';
import HeaderNavSign from './header-nav-sign';

type HeaderNavProp = {
  userName: string;
  favouriteCount: number;
}

export default function HeaderNav({userName, favouriteCount}: HeaderNavProp): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <HeaderNavFavorite userName={userName} favouriteCount={favouriteCount} />
        </li>
        <li className="header__nav-item">
          <HeaderNavSign />
        </li>
      </ul>
    </nav>
  );
}
