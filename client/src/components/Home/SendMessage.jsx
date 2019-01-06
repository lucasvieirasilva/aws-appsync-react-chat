import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMessage, sendMessage } from '../../actions/chat';
import { Form, Input } from 'reactstrap';

class SendMessage extends Component {
    handleChange(event) {
        this.props.setMessage(event.target.value);
      }

    onSubmit(event) {
        event.preventDefault();

        this.props.sendMessage(this.props.message);
    }

    render() {
        return (
            <Form onSubmit={e => this.onSubmit(e)}>
                <Input
                    value={this.props.message}
                    bsSize="lg"
                    placeholder="Press Enter to Send"
                    onChange={e => this.handleChange(e)}
                    className="message-input"
                />
            </Form>
        )
    }
}

const mapStateToProps = ({ chat }) => ({
    message: chat.message
})

const mapDispatchToProps = dispatch => ({
    setMessage: (message) => dispatch(setMessage(message)),
    sendMessage: (message) => dispatch(sendMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);