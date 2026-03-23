import { AppRoute } from "@/const";
import { CityName } from "@/types/offer";
import { Link } from "react-router-dom";

interface LoginLocationProps {
  randomCity: CityName;
}

export default function LoginLocation({ randomCity }: LoginLocationProps): JSX.Element {
  const randomCityRoute = randomCity.toLowerCase();

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link to={`${AppRoute.Root}${randomCityRoute}`} className="locations__item-link">
          <span>{randomCity}</span>
        </Link>
      </div>
    </section>
  );
}
