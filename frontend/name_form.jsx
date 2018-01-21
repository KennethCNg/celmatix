import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const NameForm = props => {

    const renderErrors = () => {
        return (
            <div className="errors">
                {props.errors}
            </div>
        );
    };

    return (
        <Form onSubmit={ props.handleNameVerification }>
            <FormControl
                required
                value={ props.fname } 
                onChange={ props.handleChange('fname') } 
                placeholder="First Name"
            />
            <br />
            <FormControl
                required 
                value={ props.lname } 
                onChange={ props.handleChange('lname') } 
                placeholder="Last Name"
            />
            <br />
            { props.errors ? renderErrors() : null }
            { props.errors ? null : <br /> }
            <Button className="pull-right" bsStyle="primary" type='submit'>Next</Button>
        </Form>
    );
     
};

export default NameForm;