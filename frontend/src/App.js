import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import SignIn from './components/SignIn';
import Gallery from './components/Gallery';
import GalleryShowImages from './components/GalleryShowImages';
// import GalleryAddImage from './components/GalleryAddImage';
import Join from './components/Join';
import Index from './components/Index';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Authorized from './components/Authorized';
import GalleryAddImage from './components/GalleryAddImage';
// import ComponentLoader from './components/ComponentLoader';
import LazyLoad from 'react-lazyload';

//event -state change - rerender
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: true,
      userinfo: [],
      authorized: false,
      error: false,
      isloggedin: false,
      images: [],
      refresh: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.addUser = this.addUser.bind(this);
    this.addComment = this.addComment.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.addUser = this.addUser.bind(this);
    this.addImage = this.addImage.bind(this);
    this.getImages = this.getImages.bind(this);
    this.editUser = this.editUser.bind(this);
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  addUser(userinfo){
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
          // console.log(res.data.userinfo)
          this.setState({
            authorized: true,
            isloggedin: true,
            userinfo: res.data
          })
        })
        .catch(error => console.log(error));
  }
  editUser(userinfo){
    // console.log("data:", userinfo)
    // console.log("token state: ", this.state.userinfo.token);


    axios({
      method: 'put',
      url: "http://localhost:5000/EditUser",
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',
        'x-access-token': this.state.userinfo.token
      },
      //get from form
      data: {
        userinfo
      }
    })
    .then(res => {
      //
      // console.log("EDIT RES DATA", res);
      this.setState({
        // authorized: 1,
        // isloggedin: 1,
        userinfo: res.data
      })
    })
    .catch(error => console.log(error));

  }
  getImages(){
    axios({
      method: 'get',
      url: "http://localhost:5000/GalleryImages",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      //
    //  console.log(res.data);
     this.setState({
       images: res.data
     })
    })
    .catch(error => console.log(error));

  }
  addComment(data){
    // console.log("APP comment: ", data)
    axios({
      method: 'post',
      url: "http://localhost:5000/AddComment",
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': `multipart/form-data; boundary=---XXX`,
        'x-access-token': this.state.userinfo.token
      },
      //get from form
      data
      
    })
    .then(res => {
      // console.log(res.data.images)
      this.setState({
        authorized: true,
        isloggedin: true,
        images: res.data.images,
        //send back new images data

        // userinfo: res.data
      })
    })
    .catch(error => console.log(error));

  }
  addImage(formdata){
    // console.log(formdata, " ", this.state.userinfo.token);
    //  console.log("IMAGE INFO APP: ", formdata);
     
      // data.append('filename', this.fileName.value);
      const formData = new FormData();
      formData.set("galleryImage", formdata.image);
      formData.set("senderpostalcode", formdata.senderpostalcode);
      formData.set("receiverpostalcode", formdata.receiverpostalcode);
      
      axios({
        method: 'post',
        url: "http://localhost:5000/AddImage",
        headers: {
          'Access-Control-Allow-Origin': '*',
          // 'Content-Type': `multipart/form-data; boundary=---XXX`,
          'x-access-token': this.state.userinfo.token
        },
        //get from form
        data: formData
        
      })
      .then(res => {
        // console.log(res)
        this.setState({
          authorized: true,
          isloggedin: true,
          // images: 
          // userinfo: res.data
        })
      })
      .catch(error => console.log(error));
  }
  signOut(){
    this.setState({
      authorized: false,
      isloggedin: false,
      userinfo: []
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
      // console.log("RES: ", res.data);
      if (res.data.message == "Success"){
        this.setState({
          authorized: true,
          isloggedin: true,
          userinfo: res.data,
          error: 0
        });
      } 
    })
    .catch(error => {
      // console.log("asfdasdf ",error," asdfasddf");
      this.setState({
        error: 1,
        authorized: false,
        isloggedin: false,
        userinfo: []
      });
    });
  }
  componentDidMount(){
    // console.log("mounted!!!")
    this.getImages();
  }
  
  render() {
    const authorized = (
      <React.Fragment>
          <Link to='/profile'>Profile</Link> |  
          <Link to='/gallery'>Gallery</Link> 
          <Route path="/signin" component={() => (<Redirect to='/profile' />)} />
          <Route path="/profile" component={() => (
            <LazyLoad placeholder={<p>Loading...</p>} height={100}>
              <Profile 
                editlink={(<Link to="/edit">Edit</Link>)} 
                signout={this.signOut} 
                userinfo={this.state.userinfo.userinfo} 
                isloggedin={this.state.isloggedin} 
              />
            </LazyLoad>)
          } />
          <Route path="/edit" component={() => (<EditProfile
            userinfo={this.state.userinfo.userinfo}
            edituser={this.editUser} />)} 
          />
         <Route path="/gallery" component={() => (
            <React.Fragment>
                
                    <GalleryAddImage addimage={this.addImage} getimages={this.getImages} />
                    <GalleryShowImages
                        showcommentform={true} 
                        images={this.state.images}
                        addcomment={this.addComment}
                        author={this.state.userinfo.userinfo.firstname}
                      />
                
              </React.Fragment>)
            }/>
           
        </React.Fragment>
    );
    const notauthorized = (
        <React.Fragment>
          <Link to='/signin'>Sign In</Link> |  
          <Link to='/join'>Join</Link> | 
          <Link to='/gallery'>Gallery</Link> 

          <Route path="/signin" component={()=>{
              return (<SignIn 
                          signIn={this.signIn} 
                          error={this.state.error} 
                      />) 
            }
          } />
          <Route path="/profile" component={() => (<Redirect to='/signin' />)} />
          <Route path="/gallery" component={() => (
            // <LazyLoad placeholder={<p>Loading...</p>} height={100}>
              //  <Fade bottom cascade>
                  <GalleryShowImages 
                      showcommentform={false} 
                      images={this.state.images}
                      addcomment={this.addComment}
                    />
                // </Fade>
            // </LazyLoad>
              )
          } />
        
          <Route path="/join" component={() => {
              return (<Join adduser={this.addUser} />)
            }} 
          />  
        </React.Fragment>
    );
    return (
      <Router>
        <div className="App container">
          <h1>Postcard Exchange</h1>
          <Link to='/'>Home</Link> | 
          <Authorized
            isloggedin={this.state.isloggedin}
            authorized={ authorized }
            default={ notauthorized }
          />
          <Route path="/" exact component={Index} />

        </div>
       
      </Router>
    );
  }
}

export default App;
