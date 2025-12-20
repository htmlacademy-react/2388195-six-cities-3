import {Link} from 'react-router-dom';
import Header from '../../components/header';

type NotFoundPageProp ={
  randomCity: string;
  userName: string;
  favouriteCount: number;
}

export default function NotFoundPage({favouriteCount, userName, randomCity}: NotFoundPageProp): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header favouriteCount={favouriteCount} userName={userName} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">404 Not Found</h1>
            <Link className="login__title" style = {{color: '#ffffff', backgroundColor: '#4481c3', paddingBottom: '6px', paddingLeft: '6px', paddingRight: '6px', paddingTop: '6px',}} to="/">Вернуться на главную</Link>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
