'use strict';

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    plugins: [ 'prettier', 'import', '@typescript-eslint', 'jest-extended' ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: 'tsconfig.json',
    },
    rules: {
        'jest-extended/prefer-to-be-true': 'warn',
        'jest-extended/prefer-to-be-false': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off'
    },
    env: {
        browser: false,
        node: true,
        es6: true,
    },
    overrides: []
};
