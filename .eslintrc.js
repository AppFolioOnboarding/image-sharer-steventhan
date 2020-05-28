module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'eslint-plugin-react',
    'jest',

  ],
  env: {
    node: true,
    commonjs: true
  },
  settings: {
    react: {
      "version": "detect"
    },
    "import/resolver": {
      webpack: {}
    }
  },
  overrides: [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "env": { "browser": true, "es6": true, "node": true },
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      "parser": "@typescript-eslint/parser",
      "plugins": [
        "@typescript-eslint"
      ],
    }
  ]
};