import Cookies from 'features/cookies';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
// tslint:disable-next-line: no-implicit-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { RootAction } from './root-action';
import { rootReducer, RootState } from './root-reducer';
import rootSaga from './root-saga';

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState?: RootState, context?: any): Store<RootState, RootAction> {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      ...context,
      cookies: new Cookies(context.req, context.res),
    },
  });
  const store: Store<RootState, RootAction> = createStore(
    rootReducer,
    initialState!,
    bindMiddleware([sagaMiddleware])
  );

  /**
   * next-redux-saga depends on `runSagaTask` and `sagaTask` being attached to the store.
   *
   *   `runSagaTask` is used to rerun the rootSaga on the client when in sync mode (default)
   *   `sagaTask` is used to await the rootSaga task before sending results to the client
   *
   */
  (store as any).runSagaTask = () => {
    (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  };

  // run the rootSaga initially
  (store as any).runSagaTask();

  return store;
}

export default configureStore;
