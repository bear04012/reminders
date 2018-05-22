import React from 'react';
import './InputBox.css';

const InputBox = (props) => {
    
    return(
    <form className="inputBox" onSubmit={event => {
        event.preventDefault();
    }}>
        <input type="checkbox" className="check"/>
        <input className="addThread"/>
    </form>
    )
    
}

export default InputBox;