import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/client';
import { AuthProvider } from './contexts/auth/AuthContext.tsx';
import { ToastProvider } from './contexts/toasts/ToastContext.tsx';
import RedirectWrapper from './components/shared_components/RedirectWrapper/RedirectWrapper.tsx';
import ProtectedRoute from './components/shared_components/ProtectedRoute/ProtectedRoute.tsx';
import { RoleCode } from './generated/graphql-types.ts';
import RoleBasedPlanning from './components/shared_components/RoleBasedPlanning/RoleBasedPlanning.tsx';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import Admin from './pages/Admin/Admin.tsx';
import Dossier from './pages/Dossier/Dossier.tsx';
import AgentHome from './pages/AgentHome/AgentHome.tsx';
import DossierBrowser from './pages/DossierBrowser/DossierBrowser.tsx';

import './index.css';

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
        element: (
          <ProtectedRoute allowedRoles={[RoleCode.Doctor, RoleCode.Secretary]}>
            <RoleBasedPlanning />
          </ProtectedRoute>
        )
      },
      {
        path: 'rechercher',
        element: (
          <ProtectedRoute allowedRoles={[RoleCode.Agent]}>
            <AgentHome />
          </ProtectedRoute>
        )
      },
      {
        path: 'dossiers',
        element: (
          <ProtectedRoute allowedRoles={[RoleCode.Agent]}>
            <DossierBrowser />
          </ProtectedRoute>
        )
      },
      {
        path: 'patient/:patientId/dossier',
        element: (
          <ProtectedRoute allowedRoles={[RoleCode.Doctor]}>
            <Dossier />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={[RoleCode.Admin]}>
            <Admin />
          </ProtectedRoute>
        )
      },
      {
        path: 'consultations',
        element: (
          <h3 className="flex h-24 place-content-center place-items-center text-center">
            [liste consultations]
          </h3>
        )
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
