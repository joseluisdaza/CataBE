module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/modules/shared/infrastructure/env/envs.ts', 'tests/**/*.steps.ts'],
    paths: ['tests/**/*.feature'],
    format: ['progress', 'html:cucumber-report/index.html'],
    formatOptions: { snippetInterface: 'async-await' }
  }
};
