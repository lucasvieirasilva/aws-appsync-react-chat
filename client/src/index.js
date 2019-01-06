import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store, history, persistor } from './store';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from "react-apollo";
import * as serviceWorker from './serviceWorker';
import './aws/amplify';
import { client } from './aws/appsync';
import App from './components/App';
import { Rehydrated } from 'aws-appsync-react';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render((
    <ApolloProvider client={client}>
        <Rehydrated>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <ConnectedRouter store={store} history={history}>
                        <Switch>
                            <Route path="/" component={App} />
                        </Switch>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        </Rehydrated>
    </ApolloProvider>), document.getElementById('root'));

serviceWorker.unregister();
