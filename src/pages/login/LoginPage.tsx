import Header from '../../components/Header.tsx';
import {login} from '../../store/user/user.thunks.ts';
import {FormEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AuthorizationStatus} from '../../const.ts';
import {useNavigate} from 'react-router-dom';
import {AppDispatch, RootState} from '../../store';

function LoginPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const authStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  if (authStatus === AuthorizationStatus.Auth) {
    navigate('/');
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);

    dispatch(login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }));
  };

  return (
    <div className="page page--gray page--login">
      <Header hideUser/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


export default LoginPage;
