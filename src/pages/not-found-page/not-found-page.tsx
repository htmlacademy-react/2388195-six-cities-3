import Layout from "@/components/layout";
import LoginLocation from "@/components/login-locaton";
import { AppRoute } from "@/const";
import { CityName } from "@/types/offer";
import { Link } from "react-router-dom";

const variants = {
  page: 'Page Not Found',
  offer: 'We have no offers with that ID',
};

interface NotFoundPageProps {
  randomCity: CityName;
  type: keyof typeof variants;
}

export default function NotFoundPage({ randomCity, type }: NotFoundPageProps): JSX.Element {
  return (
    <Layout>
      <div className="page page--gray page--login">
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title" style={{ fontSize: '26px' }}>
                {variants[type]}
              </h1>
              <Link
                className="login__title"
                style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  backgroundColor: '#4481c3',
                  borderRadius: '16px',
                  paddingBottom: '6px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '6px',
                }}
                to={AppRoute.Root}
              >
                Вернуться на главную
              </Link>
            </section>
            <LoginLocation randomCity={randomCity} />
          </div>
        </main>
      </div>
    </Layout>
  );
}
