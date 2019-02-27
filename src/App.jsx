import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Trainee from './pages/Trainee/Trainee';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Trainee />
  </MuiThemeProvider>
);

export default App;
