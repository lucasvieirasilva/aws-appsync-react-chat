import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: process.env.REACT_APP_AWS_REGION,
        userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID,
    }
});