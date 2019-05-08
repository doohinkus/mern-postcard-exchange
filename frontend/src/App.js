import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './App.css';
import SignIn from './components/SignIn';
import Gallery from './components/Gallery';
import Join from './components/Join';
import Index from './components/Index';
import Profile from './components/Profile';
//event -state change - rerender
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: true,
      userinfo: [],
      authorized: 0,
      error: 0,
      isloggedin: 0
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.addUser = this.addUser.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  addUser(userinfo){
    console.log(userinfo)
        axios({
          method: 'post',
          url: "http://localhost:5000/AddUser",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          //get from form
          data: {
            userinfo
          }
        })
        .then(res => {
          //
          this.setState({
            authorized: 1,
            isloggedin: 1,
            userinfo: res.data
          })
        })
        .catch(error => console.log(error));
    }
  signOut(){
    this.setState({
      authorized: 0,
      isloggedin: 0,
    })
  }
  
  signIn(userinfo){
    // console.log(userinfo);
    axios({
      method: 'post',
      url: "http://localhost:5000/Login",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      //get from form
      data: {
        email: userinfo.email,
        password: userinfo.password
      }
    })
    .then(res => {
      //check auth
      if (res.data.message == "Success"){
        this.setState({
          authorized: 1,
          isloggedin: 1,
          userinfo: res.data,
          error: 0
        });
      }else{
        this.setState({
          error: 'Login Error',
          authorized: 0,
          isloggedin: 0,
        });
      }
      console.log(this.state.error)
    })
    .catch(error => console.log(error));
  }
  
  render() {
    return (
      <Router>
        <div className="App container">
          <h1>International Postcard Exchange</h1>
          <Link to='/'>Home</Link> 
           | 
          {!this.state.authorized 
            ? (<Link to='/signin'>Sign In</Link>) 
            : (<Link to='/profile'>Profile</Link>)
          }
          | 
          {!this.state.authorized 
            ? (<Link to='/join'>Join</Link>) 
            : ""
          } 
          |
  
          
          <Link to='/gallery'>Gallery</Link>  
          
          
          <Route path="/" exact component={Index} />
          <Route path="/signin" component={() => {
            return this.state.authorized === 0
              ? <SignIn signIn={this.signIn} error={this.state.error} />
              //redirect
              // : <Profile signout={this.signOut} userinfo={this.state.userinfo.userinfo} />
              : (<Redirect to='/profile' />)}
            } />
          <Route path="/gallery" component={Gallery} />
          <Route path="/profile" component={() => (<Profile signout={this.signOut} userinfo={this.state.userinfo.userinfo} isloggedin={this.state.isloggedin} />)} />
    
          <Route path="/join" component={ 
            // ()  => (<Join adduser={this.addUser} />)
            () => this.state.authorized === 0 
              ? (<Join adduser={this.addUser} />)
            //   //redirect 
            //   // : (<Profile signout={this.signOut} userinfo={this.state.userinfo.userinfo} />)
              : (<Redirect to='/profile' />)
          } />
         
        </div>
       
      </Router>
    );
  }
}

export default App;
