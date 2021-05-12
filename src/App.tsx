import React from 'react';
import { Router } from 'react-router-dom';
import 'fontsource-roboto';

import {
  createMuiTheme,
  MuiThemeProvider,
  // SimplePaletteColorOptions,
} from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';
import history from './services/history';
import GlobalStyle from './styles/GlobalStyles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#359830',
    },
  },
});

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Routes />
        <ToastContainer />
      </Router>
      <GlobalStyle />
    </MuiThemeProvider>
  );
}

export default App;
