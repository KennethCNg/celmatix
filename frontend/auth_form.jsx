import React from 'react';
import * as UserAPIUtil from './api_util';
import { Grid, Row, Col } from 'react-bootstrap';
import NameForm from './name_form';

export default class AuthForm extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            fname : "",
            lname: "",
            email: "",
            age: 0,
            height: "",
            weight: 0,
            favorite_color: "",
            errors: [],
        };

        this.handleChange = this.handleChange.bind(this);        
        this.handleNameVerification = this.handleNameVerification.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.createUser = this.createUser.bind(this);
        this.turnPage = this.turnPage.bind(this);
    }

    // event handlers
    handleChange(prop) {
        return e => this.setState({[prop]: e.currentTarget.value});
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     this.createUser();
    // }

    turnPage() {
        this.setState((prevState, props) => {
            return {
                page: prevState.page + 1,
            };
        });
    }

    // sends post request to backend
    // createUser() {
    //     const state = this.state;
    //     UserAPIUtil.createUser({
    //         user: this.state 
    //     });
    // }

    setErrorState(err) {
        this.setState({
            errors: [err],
        });
    }

    clearErrors() {
        this.setState({
            errors: [],
        });
    }

    handleNameVerification(e) {
        e.preventDefault();
        UserAPIUtil.verifyName({
            name: {
                fname: this.state.fname,
                lname: this.state.lname
            } 
         }).then(() => {
             this.turnPage();
             this.clearErrors();
         },
         (err) => {
             this.setErrorState(err.responseJSON);
         });
    }

    handleEmailVerification(e) {
        e.preventDefault;
        UserAPIUtil.verifyEmail({
            email: this.state.email
        }).then(() => {
            this.turnPage();
            this.clearErrors();
        },
        (err) => {
            this.setErrorState(err.responseJSON);
        });
    }

    render() {
        return (
            <Grid>
                <Row className="row-1">
                    <Col xs={1} s={1} md={3} lg={3} xl={3}/>
                    <Col xs={11} s={11} md={6} lg={6} xl={6}>
                        <div className="auth-wrapper">
                        { this.state.page === 0 ?
                            <NameForm
                                fname={this.state.fname}
                                lname={this.state.lname}
                                handleChange={this.handleChange}
                                handleNameVerification={this.handleNameVerification}
                                errors={this.state.errors}
                            /> : null }
                        { this.state.page === 1 ?
                            <EmailForm 
                                email={this.state.email}
                                handleChange={this.handleChange}
                                handleEmailVerification={this.handleEmailVerification}
                                errors={this.state.errors}
                            /> : null }
                        </div>
                    </ Col>  
                    <Col xs={1} s={1} md={3} lg={3} xl={3}/>
                </Row>
            </Grid>
        );
    }
}