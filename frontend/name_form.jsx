import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const NameForm = props => {

    return (
        <Form onSubmit={ props.handleNameVerification }>
            <FormControl
                required
                type="text"
                value={ props.fname } 
                onChange={ props.handleChange('fname') } 
                placeholder="First Name"
            />
            <br />
            <FormControl
                required
                type="text"
                value={ props.lname } 
                onChange={ props.handleChange('lname') } 
                placeholder="Last Name"
            />
            <br />
            { props.errors ? props.renderErrors() : null }
            { props.errors ? null : <br /> }

            {props.nextButton()}       
        </Form>
    );
     
};

export default NameForm;