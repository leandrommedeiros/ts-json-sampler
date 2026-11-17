import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import jestExtended from 'eslint-plugin-jest-extended';

export default tseslint.config(
  {
    ignores: ['build/**', 'bin/**', 'node_modules/**', '**/*.js', '**/*.mjs'],
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      'jest-extended': jestExtended,
    },
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2015,
      },
      parserOptions: {
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'max-classes-per-file': ['error', 1],
      'no-constructor-return': 'error',
      'require-await': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 120,
        },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/class-literal-property-style': ['error', 'getters'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-readonly': ['error'],
      '@typescript-eslint/require-await': 'off',
      'jest-extended/prefer-to-be-false': 'error',
      'jest-extended/prefer-to-be-true': 'warn',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
      '@typescript-eslint/promise-function-async': [
        'error',
        {
          allowedPromiseNames: ['Thenable'],
          checkArrowFunctions: true,
          checkFunctionDeclarations: true,
          checkFunctionExpressions: true,
          checkMethodDeclarations: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variableLike', 'memberLike'],
          format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['typeLike'],
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          suffix: ['Interface'],
        },
        {
          selector: ['enumMember'],
          format: ['UPPER_CASE'],
        },
      ],
    },
  },
);
