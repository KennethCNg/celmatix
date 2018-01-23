const defaultColors = new Set(["Red", "Orange", "Yellow", "Green", "Blue", "Purple"]);

import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Radio } from 'react-bootstrap';

const ColorForm = props => {
    

    return (
        <Form onSubmit={ props.handleColorVerification }>
            <ControlLabel>Favorite Color</ ControlLabel>
            <FormGroup onChange={props.setColor}>
                <Radio checked={props.color === "Red"} value="Red" name="colorGroup">Red</Radio>
                <Radio value="Orange" checked={props.color === "Orange"} name="colorGroup">Orange</Radio>
                <Radio value="Yellow" checked={props.color === "Yellow"} name="colorGroup">Yellow</Radio>
                <Radio value="Green" checked={props.color === "Green"} name="colorGroup">Green</Radio>
                <Radio value="Blue" checked={props.color === "Blue"}name="colorGroup">Blue</Radio>
                <Radio value="Purple" checked={props.color === "Purple"} name="colorGroup">Purple</Radio>
                <Radio value="" name="colorGroup" checked={!(defaultColors.has(props.color) )} >Other</Radio>
                <FormControl readOnly={defaultColors.has(props.color)} type="text" value={props.color} onChange={props.handleChange('color')}/>
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