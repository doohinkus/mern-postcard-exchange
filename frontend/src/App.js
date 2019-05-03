import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import SignIn from './components/SignIn';
import Gallery from './components/Gallery';
import Join from './components/Join';
import Index from './components/Index';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

  }
  sendData(){
        axios({
          method: 'post',
          url: "http://localhost:5000/AddUser",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          data: {
            firstname: 'Jeffy',
            lastname: "faketom",
            email: 'asdfasd@adfd.com',
            streetid: 14587,
            streetname: "somestreet",
            city: "santa cruz",
            country: "USA",
            postalcode: 97055,
            password: "muckity"
          }
        })
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }

  
  render() {
    return (
      <Router>
        <div className="App">
          <h1>International Postcard Exchange</h1>
          <Link to='/'>Home</Link> | 
          <Link to='/gallery'>Gallery</Link> |
          <Link to='/join'>Join</Link> | 
          <Link to='/signin'>Sign In</Link> 
          
          
          <Route path="/" exact component={Index} />
          <Route path="/signin/" component={SignIn} />
          <Route path="/gallery/" component={Gallery} />
          <Route path="/join/" component={Join} />

        </div>
        <button onClick={this.sendData}>Test Data</button>
      </Router>
    );
  }
}

export default App;
