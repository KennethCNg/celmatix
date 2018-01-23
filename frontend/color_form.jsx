import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Radio } from 'react-bootstrap';

const ColorForm = props => {
    return (
        <Form onSubmit={ props.handleColorVerification }>
            <ControlLabel>Favorite Color</ ControlLabel>
            <FormGroup onChange={props.setColor}>
                <Radio defaultChecked value="Red" name="colorGroup">Red</Radio>
                <Radio value="Orange" name="colorGroup">Orange</Radio>
                <Radio value="Yellow" name="colorGroup">Yellow</Radio>
                <Radio value="Green" name="colorGroup">Green</Radio>
                <Radio value="Blue" name="colorGroup">Blue</Radio>
                <Radio value="Purple" name="colorGroup">Purple</Radio>
                <Radio value={props.color} name="colorGroup">Other</Radio>
                <FormControl type="text" value={props.color} onChange={props.handleChange('age')}/>
            </ FormGroup>
            <br />
            { props.errors ? props.renderErrors() : null }
            { props.errors ? null : <br /> }
            
            {props.nextButton()}
            {props.prevButton()}
        </Form>
    );

};

export default ColorForm;