import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/useAuth';
import { HeaderProps } from './Header.types';
import Logo from '/images/logo-main-white.png';
import { RoleCode } from '../../generated/graphql-types';

export const Header = ({ page, pageNames }: HeaderProps) => {
  const { user, setUser } = useAuth();
  const currentRole = user?.role.label;
  const navigate = useNavigate();
  const currentPageName = pageNames[page];
  const handeLogout = () => {
    setUser(null);
    navigate('/');
  };

  const navItems = (
    <>
      {(currentRole === RoleCode.Doctor ||
        currentRole === RoleCode.Secretary) && (
        <li>
          <a
            onClick={() => navigate('/planning')}
            className={currentPageName === 'Planning' ? `underline` : ''}
          >
            Planning
          </a>
        </li>
      )}
      {currentRole === RoleCode.Doctor && (
        <li>
          <a
            onClick={() => navigate('dossiers')}
            className={currentPageName === 'Dossier patient' ? `underline` : ''}
          >
            Dossiers
          </a>
        </li>
      )}
      <li>
        <button onClick={handeLogout}>Déconnexion</button>
      </li>
    </>
  );

  return (
    <header className="navbar bg-primary">
      <section className="navbar-start">
        <img src={Logo} className="navbar-start w-16" />
        {currentRole && (
          <span className="text-xs">Connecté en tant que {currentRole}</span>
        )}
      </section>
      <h1 role="title" className="navbar-center text-2xl text-white">
        {currentPageName}
      </h1>
      <nav role="navigation-desktop" className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </nav>
      <div className="navbar-end gap-2 md:hidden">
        <nav role="navigation-mobile" className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {navItems}
          </ul>
        </nav>
      </div>
    </header>
  );
};
