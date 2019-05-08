import React, { Component } from 'react';
import { Button, Form, Card, CardTitle, CardBody } from 'reactstrap';
import Field from "./Field";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFormChange(e){  
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.state.email || !this.state.password) return alert('missing stuff');
        return this.props.signIn(this.state);
    }
    render(){
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} className="text-left">
                    <Card>
                        <CardBody>
                            <CardTitle>Sign In</CardTitle>
                            {!this.props.error ? "" : (<div className="alert alert-danger">{this.props.error}: Incorrect email or password</div>)}
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
                                autocomplete="current-password"
                                value={this.state.password}
                                onChange={this.handleFormChange}
                    
                            />
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </CardBody>
                    </Card>
                </Form>
            </React.Fragment>
        );
    }
};

export default SignIn;