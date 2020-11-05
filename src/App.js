import React, { Component } from 'react';
import Dashboard from './layouts'
import {MuiThemeProvider} from '@material-ui/core/styles';
import Theme from './theme'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
      <div className="App">
        <Dashboard />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
