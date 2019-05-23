import React, { Component } from 'react';
import { Button, Form, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Field from "./Field";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Fade from 'react-reveal/Fade';




class Join extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            firstname: "",
            lastname: "",
            email: "",
            streetaddress: "",
            city: "",
            state: "",
            country: "",
            postalcode: "",
            password: "",
          
            firstsection: 1,
            secondsection: 0,
        
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.advanceForm = this.advanceForm.bind(this);
        this.retractForm = this.retractForm.bind(this);

    }
    handleFormChange(e){  
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const userinfo = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            streetaddress: this.state.streetaddress,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            postalcode: this.state.postalcode,
            password: this.state.password,
        }
  

            this.props.adduser(userinfo);
            this.props.history.push('/signin');
        

    }
 
    advanceForm(){
        this.setState({
            firstsection: 0,
            secondsection: 1
        });
    }
    retractForm(){
        this.setState({
            firstsection: 1,
            secondsection: 0
        });
    }
    render(){
        const firstsection = (
            <React.Fragment>
                <Card>
                    <Fade>
                        <CardBody>
                            <CardTitle>
                                Your Information
                            </CardTitle>
                                <Field 
                                    title="First Name"
                                    label="firstname"
                                    type="text"
                                    autocomplete="given-name"
                                    value={this.state.firstname}
                                    onChange={this.handleFormChange}
                        
                                />
                                <Field 
                                    title="Last Name"
                                    label="lastname"
                                    type="text"
                                    autocomplete="family-name"
                                    value={this.state.lastname}
                                    onChange={this.handleFormChange}
                        
                                />
                                <Field 
                                    title="Email"
                                    label="email"
                                    type="text"
                                    autocomplete="email"
                                    value={this.state.email}
                                    onChange={this.handleFormChange}
                        
                                />
                                <Field 
                                    title="Password"
                                    label="password"
                                    type="password"
                                    autocomplete="new-password"
                                    value={this.state.password}
                                    onChange={this.handleFormChange}
                                />
                        
                        </CardBody>
                    </Fade>
                </Card>
            </React.Fragment>);  
            const secondsection = (
                <React.Fragment>
                    <Card className="mt-3">
                        <Fade>

                            <CardBody>
                                <CardTitle>Address for Postcard</CardTitle>
                            <Field 
                                    title="Street Address"
                                    label="streetaddress"
                                    type="text"
                                    autocomplete="street-address"
                                    value={this.state.streetaddress}
                                    onChange={this.handleFormChange}

                                />
                                <Field 
                                    title="State"
                                    label="state"
                                    type="text"
                                    autocomplete="address-level1"
                                    value={this.state.state}
                                    onChange={this.handleFormChange}

                                />
                                <Field 
                                    title="City"
                                    label="city"
                                    type="text"
                                    autocomplete="address-level2"
                                    value={this.state.city}
                                    onChange={this.handleFormChange}

                                />
                                <Field 
                                    title="Country"
                                    label="country"
                                    type="text"
                                    autocomplete="country-name"
                                    value={this.state.country}
                                    onChange={this.handleFormChange}

                                />
                                <Field 
                                    title="Postalcode"
                                    label="postalcode"
                                    type="text"
                                    autocomplete="postal-code"
                                    value={this.state.postalcode}
                                    onChange={this.handleFormChange}

                                />
                                <Button>Submit</Button>
                            </CardBody>
                        </Fade>
                    </Card>
                </React.Fragment>);               
        return (
            <React.Fragment>
                <h1>Join</h1>
                <Form onSubmit={this.handleSubmit} className="text-left mw-50 mx-auto">
                    {firstsection}
                    {secondsection}
                </Form>

              
            </React.Fragment>
        );
    }
};
Join.propTypes = {
    adduser: PropTypes.func.isRequired,
};
export default withRouter(Join);