import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/client';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import Admin from './pages/Admin/Admin.tsx';
import Dossier from './pages/Dossier/Dossier.tsx';
import './index.css';
import QuickSearch from './pages/QuickSearch/QuickSearch.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        element: <Dossier />
      },
      {
        path: 'admin',
        element: <Admin />
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
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
