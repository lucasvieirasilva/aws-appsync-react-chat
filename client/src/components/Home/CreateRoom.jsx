import React, { Component } from 'react';
import { Card, Button, CardTitle, CardBody, Form, Input, FormGroup, Label, Alert, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { closeCreateRoom, createRoom } from '../../actions/room';

const CREATE_ROOM = gql`
  mutation createRoom($name: String, $visibility: String) {
    createRoom(room: $name, visibility: $visibility) {
        room
    }
  }
`

class CreateRoom extends Component {
    componentDidMount() {
        this.public.checked = true;
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.createRoom(this.roomName.value, this.public.checked ? 'public' : 'private', this.props.mutate);
    }

    close() {
        this.props.closeCreateRoom();
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Create New Room</CardTitle>

                    <Form onSubmit={(e) => this.onSubmit(e)}>
                        {this.props.error && (
                            <Alert color="danger">
                                {this.props.error.message}
                            </Alert>
                        )}
                        <Col>
                            <FormGroup row>
                                <Label for="roomName">Room Name</Label>
                                <Input type="text" name="roomName" innerRef={(input) => this.roomName = input} required />
                            </FormGroup>

                            <FormGroup tag="fieldset">
                                <legend>Visibility</legend>
                                <FormGroup check>
                                    <Label check><Input type="radio" innerRef={(input) => this.public = input} name="public" />Public</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check><Input type="radio" innerRef={(input) => this.private = input} name="private" />Private</Label>
                                </FormGroup>
                            </FormGroup>
                        </Col>

                        <Button color="primary">Create</Button>
                        <Button type="button" color="danger" onClick={() => this.close()} className="float-right">Cancel</Button>
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = ({ room }) => ({
    error: room.error
});

const mapDispatchToProps = dispatch => ({
    closeCreateRoom: () => dispatch(closeCreateRoom()),
    createRoom: (name, visibility, mutate) => dispatch(createRoom(name, visibility, mutate))
});

export default graphql(CREATE_ROOM)(connect(mapStateToProps, mapDispatchToProps)(CreateRoom));