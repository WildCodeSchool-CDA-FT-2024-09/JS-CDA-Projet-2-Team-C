import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/auth/AuthContext.tsx';
import RedirectWrapper from './components/RedirectWrapper/RedirectWrapper.tsx';
import { client } from './services/client';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import Admin from './pages/Admin/Admin.tsx';
import Dossier from './pages/Dossier/Dossier.tsx';
import AgentHome from './pages/AgentHome/AgentHome.tsx';
import './index.css';
import DossierBrowser from './pages/DossierBrowser/DossierBrowser.tsx';

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
        path: 'rechercher',
        element: <AgentHome />
      },
      {
        path: 'dossiers',
        element: <DossierBrowser />
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
