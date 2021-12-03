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
    "storybook-addon-material-ui",
  ],
  "framework": "@storybook/react",

  webpackFinal: async (config, {configType}) => {
    config.module.rules.push(...custom.module.rules);
    return config;
  },
  core: {
    builder: "webpack5"
  }
};
