import React from 'react';
import { Form, FormControl, ControlLabel } from 'react-bootstrap';

const EmailForm = props => {

    return (
        <Form onSubmit={ () => props.handleVerification("email", "email") }>
        <ControlLabel>Email</ ControlLabel>
            <FormControl
                required
                type="email"
                value={ props.email } 
                onChange={ props.handleChange('email') } 
            />
            <br />
            { props.errors ? props.renderErrors() : null }
            { props.errors ? null : <br /> }
            
            {props.nextButton()}
            {props.prevButton()} 
        </Form>
    );

};

export default EmailForm;