import {createTheme} from '@mui/material/styles';
import {lime, lightGreen, red} from '@mui/material/colors';


const THEME = createTheme({
  palette: {
    primary: {
      light: lime[100],
      main: lime[300],
      dark: lime[600],
      contrastText: lightGreen[800],
    },
    secondary: {
      light: red[400],
      main: red[700],
      dark: red[800],
      contrastText: "#ffffff",
    },
  },
});


export {
  THEME,
};
