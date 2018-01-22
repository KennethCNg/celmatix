import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

const EmailForm = props => {

    return (
        <Form onSubmit={ props.handleEmailVerification }>
            <FormControl
                required
                type="email"
                value={ props.email } 
                onChange={ props.handleChange('email') } 
                placeholder="Email"
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