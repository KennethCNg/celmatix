import React from 'react';
import { Form, FormControl, Button, ControlLabel } from 'react-bootstrap';

const NameForm = props => {
    return (
        // the arguments on submission will be sent to the backend in this format {"name" : {"fname": this.state.fname, "lname": "this.state.lname"} }
        <Form onSubmit={ (e) => props.handleVerification(e, "name", "fname", "lname") }>
            <ControlLabel>First Name</ ControlLabel>
            <FormControl
                required
                type="text"
                value={ props.fname } 
                onChange={ props.handleChange('fname') } 
            />
            <br />

            <ControlLabel>Last Name</ ControlLabel>
            <FormControl
                required
                type="text"
                value={ props.lname } 
                onChange={ props.handleChange('lname') } 
            />
            <br />
            { props.errors ? props.renderErrors() : null }
            { props.errors ? null : <br /> }

            {props.nextButton()}       
        </Form>
    );
     
};

export default NameForm;