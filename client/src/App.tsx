import { Outlet, useLocation } from 'react-router-dom';
import { PageLayout } from './components/shared_components/Layout/Layout';

export default function App() {
  const location = useLocation();

  return (
    <PageLayout page={location.pathname}>
      <Outlet />
    </PageLayout>
  );
}
