const path = require('path');

const custom = require('../webpack.config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    //"@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],
  "framework": "@storybook/react",

  /* webpackFinal: async (config) => {
    return { ...config, module: { ...config.module, rules: custom.module.rules } };
  }, */
  webpackFinal: async (config, {
    configType
  }) => {
    config.module.rules.push({
      test: /\.(scss|css)$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      //include: path.resolve(__dirname, '../')
    });
    return config;
  },
  core: {
    builder: "webpack5"
  }
};
