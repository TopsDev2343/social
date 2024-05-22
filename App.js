import React, { Component } from 'react';
import { Constants } from '@common';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import reducers from '@redux/reducers';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron-react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootRouter from './App/RootRouter';
import './ReactotronConfig';

enableScreens();

let store = null;
if (__DEV__) {
  if (Constants.useReactotron) {
    store = createStore(
      reducers,
      {},
      compose(applyMiddleware(thunk), Reactotron.createEnhancer()),
    );
  } else {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = composeEnhancers(applyMiddleware(thunk))(createStore)(reducers);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept(reducers, () => {
        const nextRootReducer = reducers;
        store.replaceReducer(nextRootReducer);
      });
    }

    // show network react-native-debugger
    global.XMLHttpRequest = global.originalXMLHttpRequest
      ? global.originalXMLHttpRequest
      : global.XMLHttpRequest;
    global.FormData = global.originalFormData
      ? global.originalFormData
      : global.FormData;
  }
} else {
  store = compose(applyMiddleware(thunk))(createStore)(reducers);
}

export default class beonews extends Component {
  UNSAFE_componentWillMount() {
    if (__DEV__) {
      Reactotron.connect();
      Reactotron.clear();
    }
  }

  render() {
    const persistor = persistStore(store);

    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootRouter />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
