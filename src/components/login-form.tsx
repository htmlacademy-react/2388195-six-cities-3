import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../hooks/store-hooks';
import { login } from '../store/thunk/user-auth';


export default function LoginForm(): JSX.Element {

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
  );
}
