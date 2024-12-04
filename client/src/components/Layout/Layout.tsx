import { PageLayoutProps } from './Layout.types';
import { Header } from '../Header/Header';
import { pageNames } from './pageNames';

export const PageLayout = ({ children, page }: PageLayoutProps) => {
  const currentRole = 'doctor';
  const loginPage = page === '/';

  return (
    <section>
      {loginPage ? (
        <header className="navbar bg-base-100"></header>
      ) : (
        <Header page={page} pageNames={pageNames} />
      )}
      <main className="layout-content container mx-auto">
        <section className="flex flex-col items-center">
          <p className="text-center text-2xl">
            current role: <span className="text-primary">{currentRole}</span>
          </p>
        </section>
        {children}
      </main>
    </section>
  );
};
