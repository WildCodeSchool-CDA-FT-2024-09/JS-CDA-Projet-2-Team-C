import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import airbnb from 'eslint-config-airbnb';

export default tseslint.config(
  { ignores: ['dist', 'src/generated/*.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, airbnb],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      jsxA11y
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'no-console': [
        'error',
        {
          allow: ['error', 'info', 'warn']
        }
      ]
    }
  }
);
