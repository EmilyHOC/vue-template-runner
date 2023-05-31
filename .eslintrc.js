module.exports = {
  parser: '@babel/eslint-parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 'latest', // specify the version of ECMAScript syntax you want to use: 2015 => (ES6)
    ecmaFeatures: {
      impliedStrict: true, // enable global strict mode
      jsx: true,
    },
    parser: 'vue-eslint-parser',
  },
  extends: ['prettier', 'plugin:vue/recommended'],
  env: {
    browser: true, // enable all browser global variables
  },
  plugins: ['prettier', 'vue'], // ['prettier', 'react-hooks']
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
    'vue/multi-word-component-names': 'off',
  },
}
