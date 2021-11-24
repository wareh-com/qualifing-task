import App, { AppComponentType, DefaultAppIProps, NextAppContext } from 'next/app';
import React from 'react';
import { END } from 'redux-saga';

export default (BaseComponent: AppComponentType<DefaultAppIProps>) => {
  class WrappedComponent extends App {
    static displayName = `withReduxSaga(${BaseComponent.displayName ||
      BaseComponent.name ||
      'BaseComponent'})`;

    static async getInitialProps(
      context: NextAppContext
    ): Promise<DefaultAppIProps> {
      const { isServer, store } = context.ctx as any;

      let pageProps: DefaultAppIProps = { pageProps: {} };
      if (BaseComponent.getInitialProps) {
        pageProps = await BaseComponent.getInitialProps(context);
      }

      // Keep saga running on the client
      if (!isServer) {
        return pageProps;
      }

      // Force saga to end on the server
      store.dispatch(END);
      await store.sagaTask.done;

      return pageProps;
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return WrappedComponent;
};
