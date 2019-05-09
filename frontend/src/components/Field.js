import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from "prop-types";
const Field = props => {
    
        return(
            <FormGroup>
                <Label for={props.label}>
                    {props.title}:
                </Label>
                <Input 
                    type={props.type} 
                    name={props.label}
                    id={props.label}
                    autoComplete={props.autocomplete}
                    value={props.value}
                    onChange={props.onChange} 
                />
            </FormGroup>
        );
    
}
Field.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autocomplete: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Field;
