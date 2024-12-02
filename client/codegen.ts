import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000',
  documents: ['src/schemas/*.ts'],
  generates: {
    './src/generated/graphql-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        scalars: {
          DateTimeISO: 'Date'
        }
      }
    }
  },
  overwrite: true
};

export default config;
