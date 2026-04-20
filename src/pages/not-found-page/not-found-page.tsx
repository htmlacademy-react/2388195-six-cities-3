import MemoizedLayout from '@/components/layout';
import MemoizedLoginLocation from '@/components/login-locaton';
import { AppRoute } from '@/const';
import { useDocumentTitle } from '@/hooks/store-hooks';
import { Link } from 'react-router-dom';
import './not-found-page.css';
import { memo } from 'react';

function NotFoundPage(): JSX.Element {
  useDocumentTitle('Not found page');
  return (
    <MemoizedLayout>
      <div className="page page--gray page--login">
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title not-found__title">404 Not Found</h1>
              <Link className="login__title not-found__link" to={AppRoute.Root}>
                Вернуться на главную
              </Link>
            </section>
            <MemoizedLoginLocation />
          </div>
        </main>
      </div>
    </MemoizedLayout>
  );
}

const MemoizedNotFoundPage = memo(NotFoundPage);
export default MemoizedNotFoundPage;
