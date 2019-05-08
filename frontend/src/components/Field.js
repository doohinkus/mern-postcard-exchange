import React from "react";
import { FormGroup, Label, Input } from 'reactstrap';
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
export default Field;