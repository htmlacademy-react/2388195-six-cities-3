import Layout from '@/components/layout';
import LoginLocation from '@/components/login-locaton';
import { AppRoute } from '@/const';
import { useDocumentTitle } from '@/hooks/store-hooks';
import { Link } from 'react-router-dom';
import './not-found-page.css';

export default function NotFoundPage(): JSX.Element {
  useDocumentTitle('Not found page');
  return (
    <Layout>
      <div className="page page--gray page--login">
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title not-found__title">404 Not Found</h1>
              <Link className="login__title not-found__link" to={AppRoute.Root}>
                Вернуться на главную
              </Link>
            </section>
            <LoginLocation />
          </div>
        </main>
      </div>
    </Layout>
  );
}
