import React, { Component } from "react";
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { ChatFeed, Message } from "react-chat-ui";
import { GET_MESSAGES } from '../../graphql/queries';
import { MESSAGE_SUBSCRIPTION } from '../../graphql/subscriptions';

class MessagesList extends Component {
    componentDidMount() {
        this.props.subscribeToNewMessages();
    }

    render() {
        const { messages } = this.props;

        return (
            <ChatFeed
                maxHeight={window.innerHeight - 80}
                messages={messages.map(
                    msg =>
                        new Message({
                            id: this.props.user && msg.handle === this.props.user.username ? 0 : msg.messageId,
                            senderName: msg.handle,
                            message: msg.body,
                        }),
                )}
                showSenderName
                bubblesCentered={false}
            />
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default graphql(GET_MESSAGES, {
    options: {
        fetchPolicy: 'cache-and-network'
    },
    props: props => ({
        messages: props.data.getMessages ? props.data.getMessages.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1) : [],
        subscribeToNewMessages: () => {
            props.data.subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData: { data: { addMessage } } }) => ({
                    getMessages: [...prev.getMessages, addMessage]
                })
            })
        } 
    })
})(connect(mapStateToProps)(MessagesList));