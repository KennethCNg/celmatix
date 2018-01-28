import React from 'react';
import * as UserAPIUtil from './api_util';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import NameForm from './name_form';
import EmailForm from './email_form';
import BioForm from './bio_form';
import ColorForm from './color_form';
import FinishPage from './finish_page';

export default class AuthForm extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            fname : "",
            lname: "",
            email: "",
            age: "17 or younger",
            height: "",
            feet: 0,
            inches: 0,
            weight: "",
            color: "Red",
            errors: [],
        };

        this.renderErrors = this.renderErrors.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleVerification = this.handleVerification.bind(this);
        this.handleBioVerification = this.handleBioVerification.bind(this);
        this.createUser = this.createUser.bind(this);
        this.turnPage = this.turnPage.bind(this); 
        this.prevButton = this.prevButton.bind(this);
        this.nextButton = this.nextButton.bind(this);
    }

    // Sets cache as state if available
    componentDidMount() {
        let cachedState = {};
        if (localStorage.length > 0) { 
            const stateKeys = Object.keys(this.state);
            for (let i = 0; i < stateKeys.length; i++) {
                let stateKey = stateKeys[i];
                let cachedValue = localStorage.getItem(stateKey);

                //  if cache has a property of state (such as page, fname, etc, store it in 'cachedState')
                if (cachedValue) {
                    cachedState[stateKey] = JSON.parse(cachedValue);
                }
            }
            localStorage.clear();
            this.setState(cachedState);
        }
    }

    cacheState(prop, value) {
        // using 0's to account for feet, inches, or the page number
        if (value || value === 0) { 
            localStorage.setItem(prop, JSON.stringify(value));
        }
    }

    // Event Handlers
    // page is the only prop that doesn't use the handleChange function
    handleChange(prop) {
        return (e) => {
            // apparently radio buttons have different methods to grab the value
            let target = e.target.type === "radio" ? e.target.value : e.currentTarget.value;

            this.cacheState(prop, target);
            this.setState({[prop]: target});
        };
    }

    // changes the height prop only if the BioVerification returns with 200 code
    setHeight() {
        this.setState({
            height: this.state.feet.toString() + "'" + this.state.inches.toString(),
        });
    }

    
    turnPage(direction) {
        let pageNum = ( direction === "next" ? this.state.page + 1 : this.state.page - 1);
        
        this.cachePage(pageNum);

        this.setState((prevState, props) => {
            return {
                page: pageNum,
                errors: [],
            };
        });
    }

    cachePage(pageNum) {
        this.cacheState("page", pageNum);
    }

    // handles NameForm and EmailForm and ColorForm verfications
    handleVerification(e, ...props) {

        // receives the key for the params as an array from the forms
        e.preventDefault();
        let args = Array.from(arguments);
        args.shift(); // removes the event (the first argument)

        let paramsHash = this.makeParamsHash(args);

        UserAPIUtil.verifyData(paramsHash)
            .then(() => {
                this.turnPage("next");
                if (this.state.page === 4) {
                    this.createUser();
                }
            },
            (err) => {
                this.setErrorState(err.responseJSON);
            });
    }

    // readies the format to pass the back-end
    makeParamsHash(paramKeys) {
        let key = paramKeys[0];
        let paramsHash = {};
        paramsHash[key] = {}; //first element in paramKeys is the key. everything else are the values to that key.

        // for-loop creates the format for the params
        for(let i = 1; i < paramKeys.length; i++) {
            let prop = paramKeys[i];
            paramsHash[key][prop] = this.state[prop];
        }
        return paramsHash;
    }

    // because the height is only set AFTER it passes the validations, Bio has its own handler to send the height to the backend 
    handleBioVerification(e) {
        e.preventDefault();
        UserAPIUtil.verifyBio({
            bio: {
                age: this.state.age,
                height: this.state.feet.toString() + "'" + this.state.inches.toString(),
                weight: this.state.weight,
            }
        }).then(() => {
            this.turnPage("next");
            this.setHeight(); // see comments above this function
        },
        (err) => {
            this.setErrorState(err.responseJSON);
        });
    }

    // HTML Elements
    nextButton() {
        return(
            <Button className="pull-right" bsStyle="primary" type='submit'>{this.state.page === 3 ? "Finish" : "Next"}</Button>
        );
    }

    prevButton() {
        return (
            <Button className="pull-right" bsStyle="primary" onClick={() => this.turnPage("prev") } type='button'>Prev</Button>
        );
    }

    renderErrors() {
        return (
            <div className="errors">
                {this.state.errors}
            </div>
        );
    }

    // MISC 
    createUser() {
        const state = this.state;
        UserAPIUtil.createUser({
            user: this.state
        });
    }

    setErrorState(err) {
        this.setState({
            errors: [err],
        });
    }

    render() {
        return (
            <Grid>
                <Row className="row-1">
                    <Col xs={1} s={1} md={3} lg={3} xl={3}/>
                    <Col xs={11} s={11} md={6} lg={6} xl={6}>
                        <div className="auth-wrapper">
                        
                        {/* Name Form */}
                        { this.state.page === 0 ?
                            <NameForm
                                fname={this.state.fname}
                                lname={this.state.lname}
                                handleChange={this.handleChange}
                                errors={this.state.errors}
                                nextButton={this.nextButton}
                                renderErrors={this.renderErrors}
                                handleVerification={this.handleVerification}
                            /> : null }

                        {/* Email Form */}
                        { this.state.page === 1 ?
                            <EmailForm 
                                email={this.state.email}
                                handleChange={this.handleChange}
                                handleVerification={this.handleVerification}
                                errors={this.state.errors}
                                prevButton={this.prevButton}
                                nextButton={this.nextButton}
                                renderErrors={this.renderErrors}
                            /> : null }
                        
                        {/* Bio Form (age, height, weight) */}
                        { this.state.page === 2 ?
                            <BioForm 
                                age={this.state.age}
                                feet={this.state.feet}
                                inches={this.state.inches}
                                weight={this.state.weight}
                                handleChange={this.handleChange}
                                handleBioVerification={this.handleBioVerification}
                                errors={this.state.errors}
                                prevButton={this.prevButton}
                                nextButton={this.nextButton}
                                renderErrors={this.renderErrors}
                            /> : null }

                        {/* Color Form */}
                        { this.state.page === 3 ?
                            <ColorForm 
                                color={this.state.color}
                                handleChange={this.handleChange}
                                handleVerification={this.handleVerification}
                                errors={this.state.errors}
                                prevButton={this.prevButton}
                                nextButton={this.nextButton}
                                renderErrors={this.renderErrors}
                            /> : null }

                        {/* Finish Form */}
                        { this.state.page === 4 ?
                            <FinishPage /> : null }
                        </div>
                    </ Col>  
                    <Col xs={1} s={1} md={3} lg={3} xl={3}/>
                </Row>
            </Grid>
        );
    }
}