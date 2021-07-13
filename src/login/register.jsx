import React from "react";
import axios from 'axios';

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password:''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    console.log("register");
    e.preventDefault();

    const {firstname, lastname, username, email, password} = this.state;
    const user = {
      firstname,
      lastname,
      username,
      email,
      password
    };
    console.log(user);
    
    axios
      .post('http://localhost:3001/register', user)
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
      <div className="base-container" ref={this.props.containerRef}>
      <div className="header">Register</div>
      <div className="content">
      <form onSubmit={this.handleSubmit}> 
        <div className="form">
            <div className="form-group">
            <label htmlFor="firstname">FirstName</label>
            <input type="text" name="firstname" placeholder="firstname" onChange={this.handleInputChange} required />
            <label htmlFor="lastanme">LastName</label>
            <input type="text" name="lastname" placeholder="lastname" onChange={this.handleInputChange} required />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" onChange={this.handleInputChange} required />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email" onChange={this.handleInputChange} required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" onChange={this.handleInputChange} required />
          </div>
        <button type="submit" className="btn">
          Register
        </button>
        </div>
        </form>
        </div>
    </div>
    );
  }
}