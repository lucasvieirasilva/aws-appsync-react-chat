import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from "react-apollo";
import { Alert } from 'reactstrap';
import gql from 'graphql-tag';

const GET_USERINFO = gql`
    query userInfo {
        userInfo {
            id,
            email
        }
    }
`;

class Home extends Component {
    render() {
        return (
            <Query query={GET_USERINFO}>
                {({ loading, error, data: { userInfo } }) => {
                    if (loading) {
                        return <h1>Loading ...</h1>;
                    } else if (error) {
                        return (
                            <Alert color="danger">
                                {JSON.stringify(error)}
                            </Alert>
                        )
                    } else {
                        return (
                            <div>
                                <h1>Id: {userInfo.id}</h1>
                                <h1>E-mail: {userInfo.email}</h1>
                            </div>
                        );
                    }
                }}
            </Query>
        )
    }
}

export default connect()(Home);