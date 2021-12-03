import '!style-loader!css-loader!sass-loader!../src/assets/styles/style.scss';
import { muiTheme } from 'storybook-addon-material-ui5';
import { THEME } from "../src/const";

export const decorators = [
	muiTheme([THEME])
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
