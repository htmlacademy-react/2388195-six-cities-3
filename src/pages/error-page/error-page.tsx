import MemoizedLogo from '@/components/logo';

export default function ErrorPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <MemoizedLogo type={'header'} />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <h1 className="visually-hidden">
            Something went wrong... Please try again
          </h1>
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Something went wrong...</b>
                <p className="cities__status-description">
                  Please try again later
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
