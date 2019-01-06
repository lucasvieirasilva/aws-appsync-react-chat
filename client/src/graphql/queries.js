import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
    query getMessages {
        getMessages {
        messageId,
        body,
        createdAt,
        handle
        }
    }
`