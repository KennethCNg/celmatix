import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const EmailForm = props => {

    const renderErrors = () => {
        return (
            <div className="errors">
                {props.errors}
            </div>
        );
    };

    return (
        <Form onSubmit={ props.handle }>
            <FormControl
                required
                value={ props.email } 
                onChange={ props.handleChange('email') } 
                placeholder="Email"
            />
            <br />
            { props.errors ? renderErrors() : null }
            { props.errors ? null : <br /> }
            <Button className="pull-right" bsStyle="primary" type='submit'>Next</Button>
        </Form>
    );

};

export default EmailForm;