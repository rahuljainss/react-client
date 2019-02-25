import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ChildrenDemo />
  </MuiThemeProvider>
);

export default App;
