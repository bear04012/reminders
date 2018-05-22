import React, {Component} from 'react';
import './Todoitem.css';

export default class Todoitem extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            
        }
        
    }
    
    render() {
        const {todoitem}= this.props;
        const {text} = todoitem.data();
        
        return(
            <div className ="thread">
                <input type="checkbox" className="check" />
                <div className = "list"> {text} </div>
            </div>
            
            )
    }
    
}