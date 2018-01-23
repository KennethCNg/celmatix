import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Radio } from 'react-bootstrap';

const BioForm = props => {
    console.log(props.age);
    return (
        <Form onSubmit={ props.handleBioVerification }>
            <ControlLabel>Age</ ControlLabel>
            <FormGroup onChange={props.setAge}>
                <Radio defaultChecked value="17 or younger" inline name="myAgeGroup">17 or younger</Radio>
                <Radio value="18 - 25" inline name="myAgeGroup">18 - 25</Radio>
                <Radio value="26 - 35" inline name="myAgeGroup">26 - 35</Radio>
                <Radio value="36 - 45" inline name="myAgeGroup">36 - 45</Radio>
                <Radio value="46 or older" inline name="myAgeGroup">46 or older</Radio>
            </ FormGroup>

            <ControlLabel>Height</ ControlLabel>
            <FormGroup>
                <ControlLabel>Feet</ ControlLabel>
                <FormControl
                    required
                    inline="true"
                    type="number"
                    value={ props.feet } 
                    max="8"
                    min="1"
                    onChange={ props.handleChange('feet') } 
                />
                <br />
                <ControlLabel>Inches</ ControlLabel>
                <FormControl
                    required
                    inline="true"
                    type="number"
                    value={ props.inches } 
                    max="12"
                    min="0"
                    onChange={ props.handleChange('inches') } 
                />
            </ FormGroup>
            <br />
            <ControlLabel>Weight (optional)</ ControlLabel>
            <FormControl
                type="number"
                value={ props.weight } 
                onChange={ props.handleChange('weight') } 
                min="0"
            />
            <br />
            { props.errors ? props.renderErrors() : null }
            { props.errors ? null : <br /> }
            
            {props.nextButton()}
            {props.prevButton()} 
        </Form>
    );

};

export default BioForm;