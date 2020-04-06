import React, { Component } from 'react'

export default class NewTripForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: ""
    }
  }

  addNewTrip = (event) => {
    event.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({destination: this.state.destination}),
    })
    .then((response) => response.json())
    .then((data) => {this.setState({allTrips: data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  handleInputChange = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
         <form onSubmit={this.addNewTrip}>
          <label>Destination:</label><br />
          <input onChange={this.handleInputChange} type="text" id="destination" name="destination" value={this.state.destination} /><br />
          <input type="submit" value="Add your trip" />
        </form>
        <button onClick={this.props.returnToMain}>See all trips</button>
      </div>
    )
  }
}
