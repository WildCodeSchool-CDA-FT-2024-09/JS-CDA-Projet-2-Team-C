import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { UserProvider } from './contexts/user/UserContext';
import RedirectWrapper from './components/RedirectWrapper/RedirectWrapper.tsx';
import { client } from './services/client';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import './index.css';
import QuickSearch from './pages/QuickSearch/QuickSearch.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RedirectWrapper>
        <App />
      </RedirectWrapper>
    ),

    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'planning',
        element: <h3 className="text-center">[contenu du planning]</h3>
      },
      {
        path: 'quicksearch',
        element: <QuickSearch />
      },
      {
        path: 'patient/:patientId/dossier',
        element: <h3 className="text-center">[contenu du dossier]</h3>
      },
      {
        path: 'admin',
        element: <h3 className="text-center">[contenu admin]</h3>
      },
      {
        path: 'consultations',
        element: <h3 className="text-center">[liste consultations]</h3>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ApolloProvider>
  </StrictMode>
);
