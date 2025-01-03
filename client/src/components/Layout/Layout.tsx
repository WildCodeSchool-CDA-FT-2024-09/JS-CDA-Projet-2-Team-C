import { PageLayoutProps } from './Layout.types';
import { Header } from '../Header/Header';
import { pageNames } from './pageNames';

export const PageLayout = ({ children, page }: PageLayoutProps) => {
  const isLoginPage = page === '/';

  return (
    <>
      {isLoginPage ? (
        <header className="navbar bg-base-100"></header>
      ) : (
        <Header page={page} pageNames={pageNames} />
      )}
      <main className="layout-content container mx-auto">{children}</main>
    </>
  );
};
