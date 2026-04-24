import { memo } from 'react';
import MemoizedLogo from './logo';
import MemoizedNav from './nav/nav';

interface HeaderProps {
  favouriteCount: number;
  typeLogo: 'header' | 'footer';
  isPageMain?: boolean;
  isPageLogin?: boolean;
}

function Header({
  favouriteCount,
  typeLogo,
  isPageMain,
  isPageLogin,
}: HeaderProps): JSX.Element | null {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <MemoizedLogo type={typeLogo} isPageMain={isPageMain} />
          </div>
          <MemoizedNav
            favouriteCount={favouriteCount}
            isPageLogin={isPageLogin}
          />
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);
export default MemoizedHeader;
