import React from "react";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    //window.location.replace('/library');
    console.log("abc");
    e.preventDefault();

    const {username, password} = this.state;
    const user = {
      username,
      password
    };
    console.log(user);
    
    axios
      .post('http://localhost:3001/login', user)
      .then(res => {
        console.log("DATA: "+res.data);
        if(res.data == 'SUCCESS'){
        window.location.replace('/library');}
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  

  render() {
    return (
      <div className="base-container">
        <div className="header">Login</div>
        <form onSubmit={this.handleSubmit}> 
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.handleInputChange} required />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
        </form>
      </div>
    );
  }
}