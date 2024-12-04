import React, { useState } from 'react';
import Logo from '/images/logo-main-white.png';
import { useNavigate } from 'react-router-dom';
import { PageLayoutProps, PageNames } from './Layout.types';

const pageNames: PageNames = {
  '/': 'Login',
  '/planning': 'Planning',
  '/consultation': 'Consultation',
  '/dossiers': 'Liste des dossiers patient',
  '/dossier:id': 'Dossier patient',
  '/patient/:patientId/dossier': 'Dossier patient',
  '/admin': 'Administrateur',
  '/consultations': 'Liste consultations'
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children, page }) => {
  const [currentRole, setCurrentRole] = useState('doctor');
  const navigate = useNavigate();

  const loginPage = page === '/';
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
    <section>
      {loginPage ? (
        <div className="navbar bg-base-100"></div>
      ) : (
        <div className="navbar bg-base-100 bg-primary">
          <div className="dropdown block md:hidden">
            <div
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
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <div className="navbar-start">
            <img src={Logo} className="w-16" />
          </div>
          <title className="navbar-center text-2xl">{currentPageName}</title>
          <div className="navbar-end">
            <ul className="menu menu-horizontal hidden px-1 md:flex">
              {navItems}
            </ul>
          </div>
        </div>
      )}
      <main className="layout-content container mx-auto">
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">
            current role: <span className="text-primary">{currentRole}</span>
          </p>
          <div className="flex items-center">
            <button
              className="btn btn-sm"
              onClick={() => {
                setCurrentRole('secretary');
                navigate('/planning');
              }}
            >
              Be a secretary
            </button>
            <button
              className="btn btn-sm"
              onClick={() => {
                setCurrentRole('agent');
                navigate('/consultations');
              }}
            >
              Be an agent
            </button>
            <button
              className="btn btn-sm"
              onClick={() => {
                setCurrentRole('doctor');
                navigate('/planning');
              }}
            >
              Be a doctor
            </button>
            <button
              className="btn btn-sm"
              onClick={() => {
                setCurrentRole('admin');
                navigate('/admin');
              }}
            >
              Be an admin
            </button>
          </div>
        </div>
        {children}
      </main>
    </section>
  );
};
