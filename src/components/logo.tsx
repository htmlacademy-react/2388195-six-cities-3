import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoute } from '../const';

interface LogoProps {
  type: 'header' | 'footer';
  isPageMain?: boolean;
}

const sizes = {
  header: {
    width: '81',
    height: '41',
  },
  footer: {
    width: '64',
    height: '33',
  },
};

export default function Logo({ type, isPageMain }: LogoProps): JSX.Element {
  const { width, height } = sizes[type];
  return (
    <Link
      className={classNames(
        `${type}__logo-link`,
        {'header__logo-link--active': isPageMain}
      )}
      to={AppRoute.Root}
    >
      <span className="visually-hidden">На главную страницу</span>
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  );
}
