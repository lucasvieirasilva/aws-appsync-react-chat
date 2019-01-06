import gql from 'graphql-tag';

export const MESSAGE_SUBSCRIPTION = gql `
    subscription onMessageCreated {
        addMessage {
            messageId,
            body,
            createdAt,
            handle
        }
    }
`