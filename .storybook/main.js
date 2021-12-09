const custom = require('../webpack.config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    "storybook-addon-material-ui5",
  ],
  "framework": "@storybook/react",

  webpackFinal: async (config, {configType}) => {
    delete config.resolve.alias['emotion-theming'];
    delete config.resolve.alias['@emotion/styled'];
    delete config.resolve.alias['@emotion/core'];
    config.module.rules.push(...custom.module.rules);
    return config;
  },
  core: {
    builder: "webpack5"
  }
};
