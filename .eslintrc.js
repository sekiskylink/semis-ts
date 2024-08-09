module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    rules: {
        // Add your custom rules here
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'indent': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
    },
    env: {
        browser: true,
        node: true,
        es6: true
    }
};
