import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/client';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import QuickSearch from './pages/QuickSearch/QuickSearch.tsx';
import './index.css';
import AgentDepartment from './pages/AgentDepartment/AgentDepartment.tsx';

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
        element: <h1>Planning</h1>
      },
      {
        path: 'rechercher',
        element: <QuickSearch />
      },
      {
        path: 'rechercher/service',
        element: <AgentDepartment />
      },
      {
        path: 'patient/:patientId/dossier',
        element: <h1>Dossier</h1>
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
