import React, {Component} from 'react';
import './Todolist.css'
import InputBox from '../components/InputBox';
import {db} from '../utils/db';
import Todoitem from './Todoitem';


export default class Todolist extends Component {
  constructor(){
    super()
    
    this.state={
      type:{title:"scheduled", completed:[]},
      title:"scheduled",
      todoitems:[],
      addList:false,
      inputItem:false,
      completed:[]
      
    }
    this.loadToDoItems();
    
  }
  
  loadToDoItems() {
    let todoitems = [];
    db.collection('reminders').get()
      .catch(e => console.error(e))
      .then(snapshot => {
        snapshot.forEach(data => {
          todoitems.push(data)
        });
        this.setState({todoitems});
        
      });
    
  }
  
  render() {
    
    const {todoitems, addList,inputItem} = this.state;
    const {title,completed} = this.state.type;
      
    for (let i=0; i<5; i++) {
      completed[i]=0;
    }
    return (
      
        <div className="box">
        
          <div className="topic">
            
            <input className="search" placeholder="Search"/>
            <div className="scheduled" 
            onClick={() => {
              this.setState({title:"Scheduled",
                             addList:false
              });
            }}><span> Scheduled </span> </div>
            <div className="reminders" 
            onClick={() => {
              this.setState({title:"Reminders",
                             addList:true
              });
            }}><span> Reminders </span> </div>
            
            <div className="onMyMac"> <span> On My Mac </span> </div>
            <div className="addList"> + Add List</div>
          </div>
          
          <div className="lists">
            <div className="title">{title}</div>
            {addList &&
              <button className="addBtn"
                      onClick = {() => {
                        this.setState({inputItem:true});
                      }}><span>+</span></button>
            }
            
            {inputItem &&
              <InputBox />
            }
            <div className="lists">
              {todoitems.map(todoitem => (
                <Todoitem key={todoitem.id} todoitem={todoitem} />
              ))
              }
            </div>
          </div>
          
        </div>
      
      )
  }
}