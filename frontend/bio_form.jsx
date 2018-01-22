import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Radio } from 'react-bootstrap';

const BioForm = props => {

    return (
        <Form onSubmit={ props.handleBioVerification }>
            <ControlLabel>Age</ ControlLabel>
                <FormGroup onChange={props.setAge}>
                    <Radio defaultChecked onChange={props.handleChange('age')} value="17 or younger" name="myAgeGroup" inline>17 or younger</Radio>
                    <Radio onChange={props.handleChange('age')} value="18 - 25" name="myAgeGroup" inline>18 - 25</Radio>
                    <Radio onChange={props.handleChange('age')} value="26 - 35" name="myAgeGroup" inline>26 - 35</Radio>
                    <Radio onChange={props.handleChange('age')} value="36 - 45" name="myAgeGroup" inline>36 - 45</Radio>
                    <Radio onChange={props.handleChange('age')} value="46 or older" name="myAgeGroup" inline>46 or older</Radio>
                </ FormGroup>
            <ControlLabel>Height</ ControlLabel>
            <FormGroup>
                <ControlLabel>Feet</ ControlLabel>
                <FormControl
                    required
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
                    type="number"
                    value={ props.inches } 
                    max="12"
                    min="0"
                    onChange={ props.handleChange('inches') } 
                />
            </ FormGroup>
            <br />
            <ControlLabel>Weight</ ControlLabel>
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