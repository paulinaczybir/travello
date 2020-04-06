import React, { Component } from 'react'

export default class Editing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tripEditMode: []
    }
  }

  componentDidMount() {
    this.getTripById(this.props.tripId);
  }

  getTripById = id => {
    fetch(`/users/${this.props.tripId}`)
      .then(response => response.json())
      .then(response => {
        this.setState({ tripEditMode: response });
      });
  };

  /*editTrip = event => {
    event.preventDefault();
    fetch(`/users/${this.props.tripId}`, {
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
  } */

  render() {
    return (
      <div>
      Editing mode
        <div>
          {this.state.tripEditMode.destination}
        </div>
        <button className="btn btn-secondary" onClick={this.props.returnToMain}>Cancel</button>
      </div>
    )
  }
}
