import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import theme from './theme';
import { AuthRoute, PrivateRoute } from './routes';
import {
  ChildrenDemo, InputDemo, Trainee, TextFieldDemo, Login, NoMatch,
} from './pages';

const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <AuthRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Trainee} />
          <PrivateRoute exact path="/textfield-demo" component={TextFieldDemo} />
          <PrivateRoute exact path="/input-demo" component={InputDemo} />
          <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </>
);

export default App;
