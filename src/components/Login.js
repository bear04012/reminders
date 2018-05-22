import React, {Component} from 'react';
import './Login.css';

export default class Login extends Component {
    constructor() {
        super()
        
        this.state={
            type:"Login",
            email:"",
            password:""
        }
        
    }
    
    render() {
        
        const {email,password} = this.state;
        
        const {loginError, tryLogin, trySignUp} = this.props;
        
        return(
            
                <div>
                    {this.state.type==="Login" ?
                        <div className = "Login">
                            
                            <form className="box" onSubmit={event => {
                                event.preventDefault();
                                tryLogin(email,password);
                            }}>
                                <button className="signUpBtn" onClick={() => 
                                    this.setState({type:"Sign Up"})
                                }> Sign Up </button>
                            
                                <h1> {this.state.type} </h1>
                                
                                <input type="email" placeholder="EMAIL" value = {email}
                                    onChange= {e => this.setState({email:e.target.value})}/>
                                    
                                <input type="password" value = {password}
                                    onChange={e => this.setState({password: e.target.value})} />
                                    
                                <button class="submitBtn"> Login </button>
                                
                                <div className="error"> {loginError} </div>
                                    
                            
                            </form>
                        
                        </div>:
                        
                        <div className = "SignUp">
                            
                            <form className="box" onSubmit={event => {
                                event.preventDefault();
                                trySignUp(email,password);

                            }}>
                                <button className="LoginBtn" onClick={() => {
                                    this.setState({type:"Login"})
                                }}> Login </button>
                            
                                <h1> {this.state.type} </h1>
                                
                                <input type="email" placeholder="EMAIL" value = {email}
                                    onChange= {e => this.setState({email:e.target.value})}/>
                                    
                                <input type="password" value = {password}
                                    onChange={e => this.setState({password: e.target.value})} />
                                    
                                <button class="submitBtn"> Sign Up </button>
                                
                                <div className="error"> {loginError} </div>
                                    
                            
                            </form>
                        </div>
                        
                    }
                </div>
            
            
            
            )
    }
    
    
    
}