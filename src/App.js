import React, { Component } from 'react';
import './App.css';
import Todolist from './containers/Todolist'
import Login from './components/Login'
import {firebase} from './utils/db';



class App extends Component {
  constructor() {
    super();
    
    this.state= {
      loginType:"Login",
      user:undefined,
      loginOpen:false,
      loginError:undefined
    }
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user, loginOpen: false, loginError: ""})
      } else {
        this.setState({
          user:undefined
        })
      }
    });
        
    
    
    this.tryLogin = this.tryLogin.bind(this);
    this.tryLogOut = this.tryLogOut.bind(this);
    this.trySignUp = this.trySignUp.bind(this);
  }
  
  tryLogOut() {
    firebase.auth().signOut().then(function() {

    }, function(error) {
      console.log(error);

    });
  }
    
  tryLogin(email,password) {
    firebase.auth().signInWithEmailAndPassword(email,password)
      .catch(error => {
        this.setState({
            loginError: error.message
        })
    })

  }
  
  trySignUp(email,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({
          loginError:error.message
        });
    });
  }
    
  
  
  render() {
    
    const {user,loginError} = this.state;
    
    return (
      
      <div className="App">
        
        {user ?
          <div>
            <Todolist />
            <button onClick={this.tryLogOut}>Sign Out </button>
          </div>:
          
          <div>
            <Login tryLogin={this.tryLogin} loginError={loginError} trySignUp={this.trySignUp}/>
          </div>
          
        }
        
      </div>
    );
  }
}

export default App;
