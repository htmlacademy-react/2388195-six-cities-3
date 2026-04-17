import Layout from '@/components/layout';
import LoginLocation from '@/components/login-locaton';
import { AppRoute } from '@/const';
import { useDocumentTitle } from '@/hooks/store-hooks';
import { Link } from 'react-router-dom';
import './not-found-page.css';

const variants = {
  page: '404 Not Found',
  offer: 'We have no offers with that ID',
};

interface NotFoundPageProps {
  type: keyof typeof variants;
}

export default function NotFoundPage({ type }: NotFoundPageProps): JSX.Element {
  useDocumentTitle('Not found page');
  return (
    <Layout>
      <div className="page page--gray page--login">
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title not-found__title">
                {variants[type]}
              </h1>
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
