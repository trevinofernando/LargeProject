import React from 'react';
import {addFriend} from '../../utils/apiCalls';

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import styles from "./header_style"


class SearchFriendForm extends React.Component {
  
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    
    console.log(event.target.elements.search.value)
    
    
    /*
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
    */
  }
  
  searchFriend = async() =>{
    console.log("Searching");
  }

  addFriendHandler = async() =>{
    console.log("Adding", this.state.username);

    let data = await addFriend(localStorage.getItem('token'), this.state.username);
    console.log("addFriend response:" , data);
    if(data.error === ""){
        console.log("addFriend was successful");
        alert("Friend request successfully sent to "+ this.username);
    }
    else{
        alert(data.error);
    } 
  }

  render() {
    const { classes } = this.props;

    return (
        <form className={classes.searchForm} onSubmit={this.handleSubmit}>
        <div className={classes.inputWrap}>
            <InputBase  className={classes.searchInput}
                name="search"
                placeholder="Search or Add a friend..."
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
                value={this.state.username} 
                onChange= { e => this.setState({...this.state, username: e.target.value})}
            />
        </div>
        <div className={classes.buttonWrap}>
            <Button type="submit" onClick={this.searchFriend} className={classes.searchButton} >
            <SearchIcon />
            </Button>
        </div>
        <div className={classes.buttonWrap}>
            <Button type="submit" onClick={this.addFriendHandler} className={classes.searchButton}>Add</Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(SearchFriendForm);