module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
  ignorePatterns: ['dist'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
      alias: {
        extensions: ['.ts', '.tsx'],
        map: [['@', './src/']],
      },
    },
    react: {
      version: 'detect',
    },
    tailwindcss: {
      callees: ['twMerge'],
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-alert': 'error',
    'react/jsx-sort-props': ['error', { reservedFirst: true }],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-redux',
            importNames: ['useSelector', 'useStore', 'useDispatch'],
            message:
              'Please use pre-typed versions from `src/app/hooks.ts` instead.',
          },
        ],
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'export'] },
      { blankLine: 'always', prev: ['const', 'let', 'export'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'export'],
        next: ['const', 'let', 'export'],
      },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
  },
  overrides: [
    {
      files: ['*.{c,m,}{t,j}s', '*.{t,j}sx'],
    },
    {
      files: ['*{test,spec}.{t,j}s?(x)'],
      env: {
        jest: true,
        'vitest-globals/env': true,
      },
      extends: [
        'plugin:vitest/recommended',
        'plugin:vitest-globals/recommended',
      ],
      plugins: ['testing-library', 'vitest'],
    },
    {
      files: ['*.ts', '*.tsx', '*.js'],
      plugins: [
        'typescript-sort-keys',
        'sort-destructure-keys',
        'sort-keys-plus',
      ],
      rules: {
        'typescript-sort-keys/interface': [
          'warn',
          'asc',
          { natural: true, requiredFirst: true },
        ],
        'typescript-sort-keys/string-enum': ['warn', 'asc', { natural: true }],
        'sort-destructure-keys/sort-destructure-keys': 'warn',
        'sort-keys-plus/sort-keys': ['warn', 'asc', { natural: true }],
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^@?\\w'],
              ['^(@/providers)(/.*|$)'],
              ['^(@/features)(/.*|$)'],
              ['^(@/components)(/.*|$)'],
              ['^(@/store)(/.*|$)'],
              ['^(@/hooks)(/.*|$)'],
              ['^(@/utilities)(/.*|$)'],
              ['^(@/constants)(/.*|$)'],
              ['^(@/types)(/.*|$)'],
              ['^(@/testData)(/.*|$)'],
              ['^(@/tests)(/.*|$)'],
              ['^(@/assets)(/.*|$)'],
              ['^\\.'],
              ['^[^.]'],
            ],
          },
        ],
      },
    },
  ],
}
