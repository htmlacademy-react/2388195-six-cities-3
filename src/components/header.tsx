import Logo from './logo';
import Nav from './nav';

interface HeaderProps {
  favouriteCount: number;
  typeLogo: 'header' | 'footer';
  isPageMain?: boolean;
  isPageLogin?: boolean;
}

export default function Header({
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
            <Logo type={typeLogo} isPageMain={isPageMain} />
          </div>
          <Nav favouriteCount={favouriteCount} isPageLogin={isPageLogin} />
        </div>
      </div>
    </header>
  );
}
