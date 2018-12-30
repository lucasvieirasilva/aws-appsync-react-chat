import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form, FormGroup, Col, Label, Alert } from 'reactstrap';
import { redirectTo } from '../actions/common';
import { login } from '../actions/auth';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

const CREATE_USER = gql`
    mutation createUser($email: String!) {
        createUser(email: $email) {
            id
        }
    }
`;

class Login extends Component {

    onSubmit(event, apolloCreateUser) {
        event.preventDefault();
        this.props.login(this.email.value, this.password.value, apolloCreateUser);
    }

    redirectToRegister() {
        this.props.redirect('/register');
    }

    render() {
        return (
            <Mutation mutation={CREATE_USER}>
                {(createUser, { data }) => (
                    <Col sm={{ size: 6, offset: 3 }} className="text-center">
                        <Form onSubmit={(e) => this.onSubmit(e, createUser)}>
                            <h1 className="text-center">Login</h1>
                            {this.props.error && (
                                <Alert color="danger">
                                    {this.props.error.message}
                                </Alert>
                            )}
                            <FormGroup row>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" innerRef={(input) => this.email = input} placeholder="Email address" required />
                            </FormGroup>

                            <FormGroup row>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" innerRef={(input) => this.password = input} placeholder="Password" required />
                            </FormGroup>

                            <FormGroup row>
                                <Button color="primary" size="lg" block disabled={this.props.inProgress} type="submit">{this.props.inProgress ? 'Login...' : 'Login'}</Button>
                            </FormGroup>

                            <label>Or</label>

                            <FormGroup row>
                                <Button color="primary" type="button" size="lg" block onClick={e => this.redirectToRegister(e)}>Register</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                )}
            </Mutation>
        )
    }
}

const mapStateToProps = state => ({ ...state.auth, inProgress: state.common.inProgress });

const mapDispatchToProps = dispatch => {
    return {
        redirect: (value) => dispatch(redirectTo(value)),
        login: (email, password, apolloCreateUser) => dispatch(login(email, password, apolloCreateUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);