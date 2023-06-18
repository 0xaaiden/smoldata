module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
<<<<<<< HEAD
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
=======
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },

>>>>>>> dev
  plugins: ['react'],
  rules: {
    'prettier/prettier': 'warn'
  }
};
