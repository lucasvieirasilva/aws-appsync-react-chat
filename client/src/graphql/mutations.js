import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
    mutation createMessage($body: String!) {
        createMessage(body: $body) {
            messageId,
            body,
            createdAt,
            handle
        }
    }
`