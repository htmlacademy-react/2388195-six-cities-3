import { AppRoute, DEFAULT_CITY } from '@/const';
import { memo } from 'react';
import { Link } from 'react-router-dom';

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

function Logo({ type, isPageMain }: LogoProps): JSX.Element {
  const { width, height } = sizes[type];

  if (isPageMain) {
    return (
      <a className={`${type}__logo-link, header__logo-link--active`}>
        <img
          className={`${type}__logo`}
          src="img/logo.svg"
          alt="6 cities logo"
          width={width}
          height={height}
        />
      </a>
    );
  }

  return (
    <Link
      className={`${type}__logo-link`}
      to={`${AppRoute.Root}${DEFAULT_CITY.toLowerCase()}`}
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

const MemoizedLogo = memo(Logo);
export default MemoizedLogo;
