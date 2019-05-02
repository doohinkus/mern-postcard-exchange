import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

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
            // "Content-Type": "application/x-www-form-urlencoded",
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
        // const  data = "firstname=testy&lastname=faker&email=fae%40fakers.comzx&streetid=asfsf&streetname=adsfasfsdaf%20adsf&city=santa%20cruz&country=USA&postalcode=7845&password=fake&undefined=";

        // const xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;

        // xhr.addEventListener("readystatechange", function () {
        //   if (this.readyState === 4) {
        //     console.log(this.responseText);
        //   }
        // });

        // xhr.open("POST", "http://localhost:5000/AddUser");
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // xhr.setRequestHeader("cache-control", "no-cache");
        // // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        

        // xhr.send(data);
    }

  
  render() {
    return (
      <div className="App">
        <h1>working</h1>
        <button onClick={this.sendData}>Test Data</button>
      </div>
    );
  }
}

export default App;
