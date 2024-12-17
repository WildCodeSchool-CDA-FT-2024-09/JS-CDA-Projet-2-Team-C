import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { DisplayTextProvider } from '../../contexts/displayText/DisplayTextContext';
import { AuthProvider } from '../../contexts/auth/AuthContext';
import { MockedProvider } from '@apollo/client/testing';

// This is a custom render function that wraps the component to be tested in all required providers.
// This allows tests that just need providers to be in the tree to be written more easily.
// https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MockedProvider mocks={[]} addTypename={false}>
      <AuthProvider>
        <DisplayTextProvider>{children}</DisplayTextProvider>
      </AuthProvider>
    </MockedProvider>
  );
};

export const renderWithAllProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => render(ui, { wrapper: AllProviders, ...options });
