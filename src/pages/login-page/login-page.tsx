import MemoizedLayout from '@/components/layout';
import LoginForm from '@/components/login-form/login-form';
import LoginLocation from '@/components/login-locaton';
import { useDocumentTitle } from '@/hooks/store-hooks';

export default function LoginPage(): JSX.Element {
  useDocumentTitle('Login');

  return (
    <MemoizedLayout isPageLogin>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <LoginLocation />
        </div>
      </main>
    </MemoizedLayout>
  );
}
