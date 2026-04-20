import { useAppDispatch } from '@/hooks/store-hooks';
import { login } from '@/store/thunk/user-auth';
import classNames from 'classnames';
import { useState, ChangeEvent, FormEvent } from 'react';
import '@/components/login-form/login-form.css';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const dispatch = useAppDispatch();

  const validateField = (name: keyof FormData, value: string): string => {
    if (name === 'email') {
      if (!value.trim()) {
        return 'Введите e-mail';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Некорректный e-mail';
      }
    }

    if (name === 'password') {
      if (!value.trim()) {
        return 'Введите пароль';
      }
      if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(value)) {
        return 'Пароль должен содержать минимум одну английскую букву и одну цифру';
      }
    }

    return '';
  };
  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    const emailError = validateField('email', data.email);
    const passwordError = validateField('password', data.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    return newErrors;
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof FormData, value) || undefined,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(login(formData));
    }
  };

  const isFormValid = Object.keys(validateForm(formData)).length === 0;

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className={classNames('login__input', 'form__input', {
            'form__input--invalid': errors.email,
          })}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="form__error">{errors.email}</span>}
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className={classNames('login__input', 'form__input', {
    'form__input--invalid': errors.password,
  })}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="form__error">{errors.password}</span>
        )}
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={!isFormValid}
      >
        Sign in
      </button>
    </form>
  );
}
