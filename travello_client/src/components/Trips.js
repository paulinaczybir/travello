import React, { Component } from 'react'

export default class Trips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allTrips: [],
    }
  }

  componentDidMount() {
    this.getTrips();
  }

  getTrips = () => {
    fetch("/users")
      .then(response => response.json())
      .then(response => {
        this.setState({ allTrips: response });
      });
  };


  deleteTrip = i => {
    fetch(`/users/${i}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          allTrips: response
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

  

  render() {
    return (
      <div>
        <div> 
          <ul>
          {this.state.allTrips.map((trip, index) => {
            return (
              <li key={index}>
              <span>
                {trip.destination}
              </span>
              <button onClick={() => this.deleteTrip(trip.id)}>
                Delete
              </button>
              <button onClick={() => this.props.editTrip(trip.id)}>
                Edit
              </button>
              </li>
            )
          })}
          </ul>
        </div>
        <button onClick={() => this.props.addTripView()}>Create new trip</button>
      </div>
    )}
 }