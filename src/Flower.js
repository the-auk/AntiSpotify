import React, { Component } from 'react';

class Flower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flower: {}
    }
    this.getFlower();
  }
  getFlower() {
      console.log("fetching flower");
    fetch('http:localhost:4001/Flower')
      .then(response => response.json())
      .then(data => {
        this.setState({
          flower: data
        });
      });
  }
  render() {
    return (
      <div className="flower">
        <h1>{this.state.flower.name}</h1>
        <p>{this.state.flower.colour}</p>
      </div>
    );
  }
}
export default Flower;