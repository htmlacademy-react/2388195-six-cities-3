import {} from '../../const';
import { useDocumentTitle } from '../../hooks/store-hooks';
import LoginForm from '../../components/login-form';
import LoginLocation from '../../components/login-locaton';
import { CityName } from '../../types/offer';

interface LoginPageProps {
  randomCity: CityName;
}

export default function LoginPage({ randomCity }: LoginPageProps): JSX.Element {
  useDocumentTitle('Login');

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm />
        </section>
        <LoginLocation randomCity={randomCity} />
      </div>
    </main>
  );
}
