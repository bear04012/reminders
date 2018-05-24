import React, {Component} from 'react';
import './Todolist.css'
import InputBox from '../components/InputBox';
import {db} from '../utils/db';
import Todoitem from './Todoitem';

export default class Todolist extends Component {
  constructor(props){
    super(props)

    this.items = {};
    
    this.state={
      addList:true,
      inputItem:false,
      items: [],

      lists:[],
      newListName: "",
      showAddListForm: false,
      selectedList: undefined
      
    }
    
    this.getLists();

    this.addItem = this.addItem.bind(this);
  }

  getLists() {
      db.collection('lists').doc(this.props.user.uid).get().then(doc => {
        if (doc.exists) {
            this.setState({
                lists: doc.data().lists,
                selectedList: doc.data().lists[0]
            });
            this.loadItems(doc.data().lists[0]);
        } else {
            this.setState({
                lists: ['reminders'],
                selectedList: 'reminders'
            });

            db.collection('lists').doc(this.props.user.uid).set({
                lists: ['reminders']
            });
        }
      })
  }
  
  addListItem() {
    let newLists = [...this.state.lists, this.state.newListName];
    
    db.collection('lists').doc(this.props.user.uid).update({
        lists: newLists
    })

    this.setState({lists: newLists});
  }

  loadItems(list) {
    this.setState({
        selectedList: list,
        items: []
    });

    if (list in this.items) {
        this.setState({
            items: this.items[list]
        });
        return;
    }

    db.collection('items').where("uid", "==", this.props.user.uid).where("list", "==", list).get()
        .then(snapshot => {
            let newItems = [];
            snapshot.forEach(item => newItems.push(item));
            this.setState({items: newItems});
            
            this.items[list] = newItems;
        })

  }

  addItem(itemText) {
    let newItem = {};
    
    newItem.data = () => {
        return {
            text: itemText,
            uid: this.props.user.uid,
            list: this.state.selectedList
        }
    };

    db.collection('items').add(newItem.data()).then(docRef => {
        newItem.id = docRef.id

        let newItems = [...this.state.items, newItem];
        this.setState({items: newItems});
        this.items[this.state.selectedList] = newItems;
    });
  }
  
  
  render() {
    
    const {items, addList,inputItem} = this.state;
    const {tryLogOut} = this.props;
      
    return (
      
        <div className="box">
        
          <div className="topic">
          
            <div className="top">
              <input className="search" placeholder="&#xf002; Search" />
              
              <div className="scheduled" 
              onClick={() => {
                this.setState({type:{...this.state.type,title:"Scheduled"},
                               addList:false,
                               inputItem:false
                               
                });
              }}><span> Scheduled </span> </div>
              
              <div className="onMyMac"> <span> On My Mac </span> </div>
              
              {
                  this.state.lists.map( (list,i) => (
                    <div key={i} onClick={() => this.loadItems(list)}>
                        {list}
                    </div>
                  ))
              }

              {
                  this.state.showAddListForm &&
                    <form onSubmit={ev => {
                        ev.preventDefault();
                        this.addListItem();
                        this.setState({
                            newListName: '',
                            showAddListForm: false
                        })
                    }}>
                        <input type="text" value={this.state.newListName} onChange={ev => {
                            this.setState({newListName: ev.target.value})
                        }} />
                    </form>
              }
              
              
            </div>
            <div className="addList" onClick={ () => this.setState({showAddListForm: true}) }> + Add List</div>
          </div>
          
          <div className="lists">
          
            <div className ="top">
              <div className="title">{this.state.selectedList}</div>
              {addList &&
                <button className="addBtn"
                        onClick = {() => {
                          this.setState({inputItem:true});
                        }}><span>+</span></button>
              }
            </div>
              
              {inputItem &&
                <InputBox addItem={this.addItem}/>
              }

            <div className ="bottom">
              <div className="lists">
                {items.map(item => (
                  <Todoitem key={item.id} todoitem={item} deleteThread={this.deleteThread} />
                ))
                }
              </div>
              
            </div>
            <button onClick={tryLogOut}>Sign Out </button>
          </div>
          
        </div>
      
      )
  }
}