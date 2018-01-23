import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Radio } from 'react-bootstrap';

const BioForm = props => {
        return (
            <Form onSubmit={ props.handleBioVerification }>
                <ControlLabel>Age</ ControlLabel>
                <FormGroup>
                    <Radio defaultChecked inline name="myAgeGroup" value={"17 or younger"} onChange={ props.handleChange("age") }>17 or younger</Radio>

                    <Radio checked={props.age === "18 - 25"} value="18 - 25" inline name="myAgeGroup" onChange={ props.handleChange("age") }>18 - 25</Radio>

                    <Radio checked={props.age === "26 - 35"} value="26 - 35" inline name="myAgeGroup" onChange={ props.handleChange("age") }>26 - 35</Radio>

                    <Radio checked={props.age === "36 - 45"} value="36 - 45" inline name="myAgeGroup" onChange={ props.handleChange("age") }>36 - 45</Radio>

                    <Radio checked={props.age === "46 or older"} value="46 or older" inline name="myAgeGroup" onChange={ props.handleChange("age") }>46 or older</Radio>
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