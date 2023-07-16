module.exports = {
  extends: ['universe/native', 'universe/shared/typescript-analysis'],
  rules: {
    // ...
    'prettier/prettier': ['error', { singleQuote: true }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
