import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import SignIn from './components/SignIn';
import GalleryShowImages from './components/GalleryShowImages';
import Join from './components/Join';
import Index from './components/Index';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Authorized from './components/Authorized';
import GalleryAddImage from './components/GalleryAddImage';
import { Nav, NavItem} from 'reactstrap';
import header from './images/header.png';

//event -state change - rerender
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: true,
      userinfo: [],
      error: false,
      isloggedin: false,
      images: [],
      refresh: false,
      baseUrl: 'http://localhost:5000'
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
    // this.state.baseUrl = 'http://68.183.173.33:80';
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  addUser(userinfo){
        axios({
          method: 'post',
          url: `${this.state.baseUrl}/AddUser`,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          data: {
            userinfo
          }
        })
        .then(res => {
          if(res.data.error){
            this.setState({
              isloggedin: false,
            })
          }else{
            this.setState({
              isloggedin: false,
              userinfo: res.data
            })
          }
        })
        .catch(error => console.log(error));
  }
  editUser(userinfo){
    axios({
      method: 'put',
      url: `${this.state.baseUrl}/EditUser`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-access-token': this.state.userinfo.token
      },
      data: {
        userinfo
      }
    })
    .then(res => {
      this.setState({
        userinfo: res.data
      })
    })
    .catch(error => console.log(error));

  }
  getImages(){
    axios({
      method: 'get',
      url: `${this.state.baseUrl}/GalleryImages`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
     this.setState({
       images: res.data
     })
    })
    .catch(error => console.log(error));

  }
  addComment(data){
    axios({
      method: 'post',
      url: `${this.state.baseUrl}/AddComment`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-access-token': this.state.userinfo.token
      },
      data
      
    })
    .then(res => {
      this.setState({
        isloggedin: true,

        images: res.data.images,

      })
    })
    .catch(error => console.log(error));

  }
  addImage(formdata){
      const formData = new FormData();
      formData.set("galleryImage", formdata.image);
      formData.set("senderpostalcode", formdata.senderpostalcode);
      formData.set("receiverpostalcode", formdata.receiverpostalcode);
      
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/AddImage`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'x-access-token': this.state.userinfo.token
        },
        data: formData
        
      })
      .then(res => {
        this.setState({
          isloggedin: true,
        }, () => this.getImages())
      })
      .catch(error => console.log(error));
  }
  signOut(e){
    e.preventDefault();
    this.setState({
      isloggedin: false,
      userinfo: []
    });
  }
  
  signIn(userinfo){
    axios({
      method: 'post',
      url: `${this.state.baseUrl}/Login`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: {
        email: userinfo.email,
        password: userinfo.password
      }
    })
    .then(res => {
      if (res.data.message == "Success"){
        this.setState({
          isloggedin: true,
          userinfo: res.data,
          error: false
        });
      } 
    })
    .catch(error => {
      this.setState({
        error: true,
        isloggedin: false,
        userinfo: []
      });
    });
  }
  componentDidMount(){
    this.getImages();
  }
  
  render() {
    const authorized = (
      <React.Fragment>
          <Nav tabs>
          <NavItem>
              <Link to='/' className="nav-link">Home</Link>
          </NavItem>
          <NavItem>
              <Link to='/profile' className="nav-link">Profile</Link>
          </NavItem>
          <NavItem>
              <Link to="/edit" className="nav-link">Edit</Link>
          </NavItem>
          <NavItem>
              <a href='#' className="nav-link" onClick={this.signOut}>Sign Out</a>
          </NavItem>
          <NavItem>
              <Link to='/gallery' className="nav-link">Gallery</Link>
          </NavItem>
        </Nav>
          <Route path="/signin" component={() => (<Redirect to='/profile' />)} />
          <Route path="/profile" component={() => (
        
              <Profile 
                signout={this.signOut}
                partnerinfo={this.state.userinfo} 
                userinfo={this.state.userinfo.userinfo} 
                isloggedin={this.state.isloggedin} 
              />
            )
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
                        url={this.state.baseUrl} 
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
        <Nav tabs>
          <NavItem>
              <Link to='/' className="nav-link">Home</Link>
          </NavItem>
          <NavItem>
              <Link to='/signin' className="nav-link">Sign In</Link>
          </NavItem>
          <NavItem>
              <Link to='/join' className="nav-link">Join</Link>
          </NavItem>
          <NavItem>
              <Link to='/gallery' className="nav-link">Gallery</Link>
          </NavItem>
        </Nav>
        
  
        <Route path="/signin" component={()=>{
            return (<SignIn 
                        signIn={this.signIn} 
                        error={this.state.error} 
                    />) 
          }
        } />
        <Route path="/profile" component={() => (<Redirect to='/signin' />)} />

      
        <Route path="/gallery" component={() => (
              <GalleryShowImages 
                  showcommentform={false} 
                  url={this.state.baseUrl} 
                  images={this.state.images}
                  addcomment={this.addComment}
                />
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
           <div>
            <img src={header} className='img-thumbnail border-0' />
           </div>
         
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
