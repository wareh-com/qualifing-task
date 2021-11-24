import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import getPageContext, { MUIPageContext } from 'features/mui/get-page-context';
import { styles } from 'features/mui/global-styles';
import theme from 'features/mui/theme';
import { configureStore, RootAction, RootState } from 'features/redux';
import withReduxSaga from 'features/redux/with-redux-saga';
import withRedux from 'next-redux-wrapper';
import App, { Container, NextAppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import { Store } from 'redux';

type Props = { store: Store<RootState, RootAction> };

class Application extends App<Props> {
  pageContext: MUIPageContext;

  constructor(props: any) {
    super(props);
    this.pageContext = getPageContext();
  }

  static async getInitialProps(appContext: NextAppContext) {
    const { Component, ctx } = appContext;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <title>{'Boilerplate'}</title>
        </Head>
        <Provider store={store}>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass sheetsRegistry to the _document though the renderPage enhancer
                 to render collected styles on server side. */}
              <Component sheetsRegistry={this.pageContext.sheetsRegistry} {...pageProps} />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    );
  }
}

export default withStyles(styles)(withRedux(configureStore)(withReduxSaga(Application)));
