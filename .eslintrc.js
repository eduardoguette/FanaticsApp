const RULES = {
  OFF: 'off',
  ON: 'on',
  WARN: 'warn',
  ERROR: 'error',
};
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': RULES.OFF,
    camelcase: RULES.OFF,
    quotes: RULES.OFF,
    semi: RULES.OFF,
  },
};
