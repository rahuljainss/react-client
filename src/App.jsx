import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
// import AddDialog from './pages/Trainee/components/AddDialog/AddDialog';
import Trainee from './pages/Trainee/Trainee';
// import AddDialog from './pages/Trainee/components/AddDialog/AddDialog';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Trainee />
  </MuiThemeProvider>
);

export default App;
