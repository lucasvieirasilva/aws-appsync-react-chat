import { Auth } from 'aws-amplify';
import { ApolloLink } from 'apollo-link';
import AWSAppSyncClient, { createAppSyncLink } from "aws-appsync";

const authConfig = {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: async () =>
        (await Auth.currentSession()).getAccessToken().getJwtToken()
};

export const client = new AWSAppSyncClient({
    disableOffline: true,
    url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
    region: process.env.REACT_APP_AWS_REGION,
    auth: authConfig,
    complexObjectsCredentials: () => Auth.currentCredentials()
}, {
    link: ApolloLink.from([
        createAppSyncLink({
            url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
            region: process.env.REACT_APP_AWS_REGION,
            auth: authConfig,
            complexObjectsCredentials: () => Auth.currentCredentials()
        })
    ])
});