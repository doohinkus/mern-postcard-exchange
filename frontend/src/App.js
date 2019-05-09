import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import SignIn from './components/SignIn';
import Gallery from './components/Gallery';
import Join from './components/Join';
import Index from './components/Index';
import Profile from './components/Profile';
import Authorized from './components/Authorized';
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
    this.addImage = this.addImage.bind(this);
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
  addImage(imageinfo){
    // console.log(imageinfo, " ", this.state.userinfo.token);
     console.log(imageinfo);
     let formdata = new FormData();
     formdata.append("galleryImage", imageinfo);

      // data.append('filename', this.fileName.value);
        axios({
          method: 'post',
          url: "http://localhost:5000/Gallery",
          headers: {
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': `multipart/form-data; boundary=---XXX`,
            'x-access-token': this.state.userinfo.token
          },
          //get from form
          data: formdata
        })
        .then(res => {
          console.log(res)
          this.setState({
            // authorized: 1,
            // isloggedin: 1,
            // userinfo: res.data
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
          <h1>Postcard Exchange</h1>
          <Link to='/'>Home</Link> 
           | 
           
          <Authorized
            isloggedin={this.state.isloggedin}
            authorized={<Link to='/profile'>Profile</Link>} 
            default={<Link to='/signin'>Sign In</Link>} 
          /> 
           | 
          
          <Authorized
            isloggedin={this.state.isloggedin}
            authorized={" "} 
            default={<Link to='/join'>Join</Link>} 
          /> 
           | 
          
  
          
          <Link to='/gallery'>Gallery</Link>  
          
          <Authorized 
            isloggedin={this.state.isloggedin} 
            authorized={<p>Authorized component goes here</p>}
            default={<p>default component goes here</p>}
          />
          
          <Route path="/" exact component={Index} />
          <Route path="/signin" component={() => {
            return (<Authorized 
                isloggedin={this.state.isloggedin}
                authorized={<Redirect to='/profile' />}
                default={<SignIn signIn={this.signIn} error={this.state.error} />}
                />)
              }
            } />
          <Route path="/gallery" component={() => (
            <Gallery 
            isloggedin={this.state.isloggedin} 
            userinfo={this.state.userinfo}
            addimage={this.addImage} />)
          } />
          <Route path="/profile" component={() => (<Profile 
            signout={this.signOut} 
            userinfo={this.state.userinfo.userinfo} 
            isloggedin={this.state.isloggedin} />)
          } />
    
          <Route path="/join" component={ 
            () =>
            {
              return <Authorized 
                isloggedin={this.state.isloggedin}
                authorized={<Redirect to='/profile' />}
                default={<Join adduser={this.addUser} />}
              />
            }
          } />
         
        </div>
       
      </Router>
    );
  }
}

export default App;
