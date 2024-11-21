# JS-CDA-Projet-2-Team-C

# CONVENTIONS / How to contribute

## Branch naming

```bash
[BUGFIX/HOTFIX/REFACTO/FEATURE/SETUP/CHORE]/US[USnumber]/[featureName]
>> DEV/US23/SignUpForm
>> BUGFIX/US103/CSSisBroken
```

[BUGFIX/HOTFIX/REFACTO/FEATURE/SETUP/CHORE] # Type of task or work being done:

- BUGFIX: Fixing an issue or bug
- HOTFIX: Urgent fix for a production issue
- REFACTO: Code refactoring (improving structure, not functionality)
- FEATURE: Adding a new feature or functionality
- SETUP: Environment setup or configuration work
- CHORE: Routine tasks (e.g., dependency updates, minor maintenance)

US[USnumber] # Related User Story number (e.g., US1234) from project management tool (e.g., Jira)

[featureName] # A short description of the feature or task being worked on

## Commits

- in lowercase
- format scope/commit-subject: add commit description using present tense verbs
- The scope part is optional; it can be used to better clarify the scope of the commit within the codebase.

```bash
>> code-quality: install husky, add husky pre-commit scripts at project root
>> client/routing: refactor separate character components into CharacterPage
```

## FrontEnd structure

```
└── src/
    ├── contexts/
    │   ├── auth/
    │   │   ├── AuthContext.tsx         # Context for user authentication (e.g., login state, tokens)
    │   │   ├── useAuth.ts              # Custom hook for consuming AuthContext
    │   │   └── useAuth.test.tsx        # Tests for the useAuth custom hook
    │   └── theme/
    │       ├── ThemeContext.tsx        # Context for managing theme state (e.g., light/dark mode)
    │       ├── useTheme.ts             # Custom hook for consuming ThemeContext
    │       └── useTheme.test.tsx       # Tests for the useTheme custom hook
    ├── components/
    │   └── Component/
    │       ├── Component.css           # Styles for the component
    │       ├── Component.tsx           # The component's main logic (JSX/TSX)
    │       ├── Component.types.ts      # TypeScript types for component props
    │       └── Component.test.tsx      # Tests for the component
    ├── pages/
    │   └── Page/
    │       ├── Page.css               # Styles for the page
    │       ├── Page.tsx               # The page's main logic (JSX/TSX)
    │       └── Page.types.ts          # Optional: TypeScript types for page props
    └── stylesheets/
        └── Globals.css               # Global styles for the app
```

## BackEnd structure

```
├── src/
│   ├── modules/
│   │   └── user/
│   │       ├── user.entity.ts       # Defines User table schema (TypeORM).
│   │       ├── user.resolver.ts     # Handles user-related GraphQL queries/mutations.
│   │       ├── user.inputs.ts       # GraphQL input types for user operations.
│   │       └── user.test.ts         # Unit tests for user resolvers and services.
│   ├── utilities/
│   │   └── some.utility.ts          # Optional utility functions.
│   ├── services/                    # Business logic and service classes.
│   └── database/                    # Database connection and configuration.
│       ├── seed/                    # Contains seed-related logic and scripts.
│       ├── seedData/                # Holds the data for seeding the database.
│       └── dataSource.ts            # TypeORM data source configuration.
├── index.ts                       # Main application entry point
└── tsconfig.json                 # TypeScript configuration
```
