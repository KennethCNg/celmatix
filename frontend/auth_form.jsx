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

    // Deals with Caching Information
    componentDidMount() {
        let cachedState = {};
        if (localStorage.length > 0) {
            const stateKeys = Object.keys(this.state);
            for (let i = 0; i < stateKeys.length; i++) {
                let stateKey = stateKeys[i];
                let cachedValue = localStorage.getItem(stateKey);
                if (cachedValue) {
                    cachedState[stateKey] = JSON.parse(cachedValue);
                }
            }
            this.setState(cachedState);
        }
    }

    componentDidUpdate() {
        this.cacheState();
    }

    cacheState(prop, value) {
        if (value || value === 0) {
            localStorage.setItem(prop, JSON.stringify(value));
        }
    }

    // Event Handlers
    handleChange(prop) {
        return (e) => {
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
        let pageNum = ( direction === "next" ? this.state.page + 1 : this.state.page -1);
        
        this.cacheState("page", pageNum);
        this.setState((prevState, props) => {
            return {
                page: pageNum,
                errors: [],
            };
        });
    }

    // handles NameForm and EmailForm and Color Form
    handleVerification(e, ...props) {
        let args = Array.from(arguments);
        args = [...arguments];
        let key = args[0];
        let paramsHash = {};
        paramsHash[key] = {};
        for(let i = 1; i < args.length; i++) {
            let prop = args[i];
            paramsHash[key][prop] = this.state[prop];
        }

        UserAPIUtil.verifyData(paramsHash)
            .then(() => {
                this.turnPage("next");
            },
            (err) => {
                this.setErrorState(err.responseJSON);
            });
    }

    // I could refactor handleVerification to deal with multiple keys (such as Bio, and Color), but it's not a necessity at the moment
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
            this.setHeight();
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
                        
                        {/* Bio Form */}
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