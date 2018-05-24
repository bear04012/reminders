import React from 'react';
import './InputBox.css';

const InputBox = (props) => {
    let textInput;
    
    
    return(
        <form className="inputBox" onSubmit={event => {
            event.preventDefault();
            props.addThread(textInput.value)
            textInput.value="";
            
        }}>
            <input type="checkbox" className="check"/>
            <input ref={(tag) => {
                textInput = tag}} className="addThread" placeholder="Add a New Item"/>
        </form>
    )
    
}

export default InputBox;