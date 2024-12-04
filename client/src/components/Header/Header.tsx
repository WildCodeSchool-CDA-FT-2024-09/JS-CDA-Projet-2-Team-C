import Logo from '/images/logo-main-white.png';
import { useNavigate } from 'react-router-dom';
import { HeaderProps } from './Header.types';

export const Header = ({ page, pageNames }: HeaderProps) => {
  const currentRole = 'doctor';
  const navigate = useNavigate();

  const currentPageName = pageNames[page];

  const navItems = (
    <>
      {(currentRole === 'doctor' || currentRole === 'secretary') && (
        <li>
          <a
            onClick={() => navigate('/planning')}
            className={currentPageName === 'Planning' ? `underline` : ''}
          >
            Planning
          </a>
        </li>
      )}
      {currentRole === 'doctor' && (
        <li>
          <a
            onClick={() => navigate('patient/:patientId/dossier')}
            className={currentPageName === 'Dossier patient' ? `underline` : ''}
          >
            Dossiers
          </a>
        </li>
      )}
      <li>
        <a onClick={() => navigate('/')}>Déconnexion</a>
      </li>
    </>
  );

  return (
    <header className="navbar bg-base-100 bg-primary">
      <nav className="dropdown block md:hidden">
        <button tabIndex={0} role="button" className="btn btn-circle btn-ghost">
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
      <section className="navbar-start">
        <img src={Logo} className="navbar-start w-16" />
      </section>
      <title className="navbar-center text-2xl">{currentPageName}</title>
      <nav className="navbar-end">
        <ul className="menu menu-horizontal hidden px-1 md:flex">{navItems}</ul>
      </nav>
    </header>
  );
};
