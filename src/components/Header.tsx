import {Link} from 'react-router-dom';
import {AppDispatch, RootState} from '../store';
import {AuthorizationStatus} from '../const.ts';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/user/user.thunks.ts';

export interface HeaderProps {
  hideUser?: boolean;
}

function Header({hideUser}: HeaderProps): JSX.Element {
  const {authorizationStatus, email} = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>

          {hideUser ? null :
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="#">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{email}</span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="#" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign in</span>
                  </Link>
                )}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
