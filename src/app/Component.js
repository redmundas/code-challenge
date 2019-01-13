import React, { Component } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { configStore } from '../store';
import Loadable from '../lib/asyncComponent';
import Header from '../modules/header';
import { Container } from './styled';

const history = createBrowserHistory();
const { store, persistor } = configStore(history);

const Tweets = Loadable(() =>
  import(/* webpackChunkName: "tweets" */ '../modules/tweets'),
);

const NotFound = Loadable(() =>
  import(/* webpackChunkName: "not-found" */ '../modules/not-found'),
);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <Header />
          <Container>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" render={() => <Tweets />} />
                <Route render={() => <NotFound />} />
              </Switch>
            </ConnectedRouter>
          </Container>
        </PersistGate>
      </ReduxProvider>
    );
  }
}

export default App;
