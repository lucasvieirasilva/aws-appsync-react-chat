import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LIST_ROOMS = gql`
  query listRooms {
    rooms {
      items {
        room,
        owner {
            email
        }
      }
    }
  }
`

class RoomList extends Component {
    componentWillReceiveProps(props) {
        if (props.needRefetch) {
            props.data.refetch();
        }
    }

    render() {
        const { data: { loading, rooms } } = this.props;
        if (loading) return <h4>Loading Rooms...</h4>;

        return (
            <ListGroup>
                {rooms.items.map(item => (
                    <ListGroupItem key={item.room} className="justify-content-between">
                        <strong>Name:</strong> {item.room} - <strong>Owner: </strong> {item.owner.email} <Badge color="primary">14</Badge>
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }
}

const mapStateToProps = ({ room }) => ({
    needRefetch: room.refetch
})

export default graphql(LIST_ROOMS)(connect(mapStateToProps)(RoomList));