import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <Link className="footer__logo-link" to={AppRoute.Root}>
        <span className="visually-hidden">На главную страницу</span>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  );
}
