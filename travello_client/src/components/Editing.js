import React, { Component } from 'react'

export default class Editing extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  editTrip = i => {
    i.preventDefault();
    fetch(`/users/${i}`, {
      method: "PUT",
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

  render() {
    return (
      <div>
      Editing mode
        <div>
          {this.props.tripId}
        </div>
        <button onClick={this.props.returnToMain}>Cancel</button>
      </div>
    )
  }
}
