import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import interestTheme from './theme';
import { colors } from './theme';

import Footer from './components/footer';
import Feeds from './components/feeds';
import Header from './components/header';

class App extends Component {
  state = {
  };

  render() {
    return (
      <MuiThemeProvider theme={ createMuiTheme(interestTheme) }>
        <CssBaseline />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
            minHeight: '100vh',
            background: colors.almostBlack
          }}>
            <Header />
            <Feeds />
            <Footer />
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
