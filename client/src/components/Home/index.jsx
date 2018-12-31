import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import RoomList from './RoomList';

class Home extends Component {
    render() {
        return (
            <Col>
                <h1>Rooms</h1>
                <RoomList />
            </Col>
        );
    }
}

export default connect()(Home);