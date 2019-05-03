import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange(e){  
        this.setState({
            email: e.target.value,
        });
    }
    handlePasswordChange(e){  
        this.setState({
            password: e.target.value,
        });
    }
    handleSubmit(e){
        e.preventDefault();
        //call parent function
    }
    render(){
        return (
            <React.Fragment>
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input 
                        type="text" 
                        name='email'
                        autoComplete='email'
                        value={this.state.email}
                        onChange={this.handleEmailChange} />
                    </label>
                    <label>
                        Password:
                        <input 
                        type="password" 
                        name="password"
                        value={this.state.password}
                        autoComplete='current-password' 
                        onChange={this.handlePasswordChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </React.Fragment>
        );
    }
};

export default SignIn;