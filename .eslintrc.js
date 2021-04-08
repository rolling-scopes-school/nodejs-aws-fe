module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    // 'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    semi: 0,
    eqeqeq: [1, 'always'],
    quotes: [1, 'single'],
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': [2, 'prefer-double'],
    'no-undef': 0,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 0,
    'no-mixed-operators': [
      1,
      {
        allowSamePrecedence: true,
      },
    ],
    'eol-last': [2, 'always'],
    'no-confusing-arrow': 0,
    'arrow-parens': [2, 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'arrow-body-style': [2, 'as-needed'],
    'no-extra-parens': ['warn', 'all', { ignoreJSX: 'multi-line' }],
    'no-param-reassign': 0,
    'prefer-template': 0,
    'prefer-promise-reject-errors': 0,
    'no-script-url': 0,
    'prefer-promise-reject-errors': 0,
    'no-unused-expressions': 0,
    // "dot-notation": 0,

    'import/prefer-default-export': 0,
    'import/no-useless-path-segments': 'off',
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-duplicates': 0,
    'import/order': 0,
    'import/no-named-as-default-member': 0,
    'import/namespace': 0,
    'import/named': 0,

    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/iframe-has-title': 0,
    'jsx-a11y/control-has-associated-label': 0,

    'react/jsx-wrap-multilines': [
      2,
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'ignore',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': 0,
    'react/jsx-boolean-value': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-closing-bracket-location': [2, { selfClosing: 'tag-aligned', nonEmpty: 'line-aligned' }],
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-curly-spacing': 0,
    'object-curly-spacing': 1,
    'react/no-access-state-in-setstate': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-no-bind': 0,
    'react/require-default-props': 0,
    'react/display-name': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
  },
};
