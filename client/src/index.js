import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store, history } from './store';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from "react-apollo";
import * as serviceWorker from './serviceWorker';
import './aws/amplify';
import { client } from './aws/appsync';
import App from './components/App';

ReactDOM.render((<Provider store={store}>
    <ConnectedRouter store={store} history={history}>
        <ApolloProvider client={client}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ApolloProvider>
    </ConnectedRouter>
</Provider>), document.getElementById('root'));

serviceWorker.unregister();
