import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {
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
    console.log("abc");
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
      .then(() => console.log('User Created'))
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
            <input type="text" name="firstname" placeholder="firstname" onChange={this.handleInputChange} />
            <label htmlFor="lastanme">LastName</label>
            <input type="text" name="lastname" placeholder="lastname" onChange={this.handleInputChange} />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" onChange={this.handleInputChange} />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email" onChange={this.handleInputChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" onChange={this.handleInputChange} />
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

export default Create;