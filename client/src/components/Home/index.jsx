import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import MessagesList from './MessagesList';
import SendMessage from './SendMessage';

class Home extends Component {
    render() {
        return (
            <Col>
                <MessagesList />
                <SendMessage />
            </Col>
        );
    }
}

export default connect()(Home);