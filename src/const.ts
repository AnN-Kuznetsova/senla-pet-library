import {createTheme} from '@mui/material/styles';
import {lime, lightGreen, red} from '@mui/material/colors';


const DEBOUNCE_DELAY = 500; // ms
const WAIT_DELAY = 300; // ms
const TIME_TO_READ = 30; // days
const DEFOULT_COVER_IMGURL = `./assets/img/sass-logo.png`;

enum FetchStatus {
  LOADING = `LOADING`,
  RESOLVED = `RESOLVED`,
  REJECTED = `REJECTED`,
}

enum FetchOperation {
  LOAD = `LOAD`,
  ADD_NEW = `ADD_NEW`,
  UPDATE = `UPDATE`,
  DELETE = `DELETE`,
}

enum FetchError {
  PAYLOAD_TOO_LARGE = 413,
  NOT_FOUND = 404,
}

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
  DEFOULT_COVER_IMGURL,
  DEBOUNCE_DELAY,
  WAIT_DELAY,
  TIME_TO_READ,
  THEME,
  FetchError,
  FetchOperation,
  FetchStatus,
};
