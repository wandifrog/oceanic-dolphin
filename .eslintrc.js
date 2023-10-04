const OFF = 0; // Turn the rule off
const WRN = 1; // Turn the rule on as a warning (doesn't affect exit code)
const ERR = 2; // Turn the rule on as an error (exit code will be 1)

module.exports = {
  root: true,
  env: {
    'es6': true
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['import'],
  reportUnusedDisableDirectives: true,
  rules: {
    '@typescript-eslint/ban-ts-comment': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/member-delimiter-style': OFF,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-unused-vars': WRN,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/type-annotation-spacing': ERR,
    'array-element-newline': [ERR, 'consistent'],
    'arrow-parens': [ERR, 'always'],
    'comma-dangle': [ERR, 'only-multiline'],
    'comma-spacing': [ERR, { 'before': false, 'after': true }],
    'eol-last': [WRN, 'always'],
    'eqeqeq': WRN,
    'import/order': ERR,
    'import/named': OFF,
    'import/no-unresolved': OFF,
    'indent': [ERR, 2, { 'SwitchCase': 1 }],
    'jsx-quotes': [ERR, 'prefer-double'],
    'key-spacing': [ERR, { 'beforeColon': false }],
    'keyword-spacing': [ERR, { 'after': true }],
    'no-alert': OFF,
    'no-console': OFF,
    'no-multi-spaces': [ERR],
    'no-multiple-empty-lines': [ERR, { 'max': 2 }],
    'object-curly-spacing': [ERR, 'always'],
    'prettier/prettier': OFF,
    'quotes': [ERR, 'single'],
    'react-hooks/exhaustive-deps': OFF,
    'react/prop-types': OFF,
    'react/react-in-jsx-scope': OFF,
    'semi': [WRN, 'always'],
    'space-before-blocks': [ERR, 'always'],
    'space-before-function-paren': [ERR, { 'named': 'never', 'asyncArrow': 'always' }],
    'space-in-parens': [ERR, 'never'],
  }
};
