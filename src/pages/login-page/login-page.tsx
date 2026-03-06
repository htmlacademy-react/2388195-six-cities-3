import { Link } from 'react-router-dom';
import { AppRoute, CityName } from '../../const';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useDocumentTitle } from '../../hooks/store-hooks';
import { login } from '../../store/thunk/user-auth';

interface LoginPageProps {
  randomCity: CityName;
}

// type HTMLLoginForm = HTMLFormElement & {
//   email: HTMLInputElement;
//   password: HTMLInputElement;
// };

// type ChangeHandler = ReactEventHandler<HTMLInputElement>;

export default function LoginPage({ randomCity}: LoginPageProps): JSX.Element {

  useDocumentTitle('Login');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useAppDispatch();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(login(formData));
  }

  return (

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link to={AppRoute.Root} className="locations__item-link">
              <span>{randomCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}


// Валидация формы - хуком
// ///////////////////////////////////////////////////////////
