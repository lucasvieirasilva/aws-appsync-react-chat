import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Button } from 'reactstrap';
import RoomList from './RoomList';
import { openCreateRoom, closeCreateRoom } from '../../actions/room'
import CreateRoom from './CreateRoom';

class Home extends Component {
    newRoom() {
        this.props.openCreateRoom();
    }

    render() {
        return (
            <Col>
                <h1>Rooms{' '}
                    {!this.props.isOpenCreate && (
                        <Button color="primary" onClick={(e) => this.newRoom()}>New Room</Button>
                    )}
                </h1>
                {this.props.isOpenCreate && (
                    <CreateRoom />
                )}
                {!this.props.isOpenCreate && (
                    <RoomList />
                )}
            </Col>
        );
    }
}

const mapStateToProps = ({ room }) => ({
    isOpenCreate: room.isOpenCreate
});

const mapDispatchToProps = dispatch => ({
    openCreateRoom: () => dispatch(openCreateRoom()),
    closeCreateRoom: () => dispatch(closeCreateRoom())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);