module.exports = {
  files: ['./src/**/*.test.ts'],
  failFast: true,
  extensions: ['ts'],
  require: [
    'ts-node/register',
    'tsconfig-paths/register',
    './src/tests/setup.ts',
  ],
}
