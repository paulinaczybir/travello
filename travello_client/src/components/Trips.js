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
        <h3>Welcome to Travello! Keep all of your trip details in one place and enjoy stress-free travelling!</h3>
        <button id="newTripBtn" className="btn btn-secondary btn-lg" onClick={() => this.props.addTripView()}>Create new trip</button>
        <div className="container">
          <div className="row"> 
            {this.state.allTrips.map((trip, index) => {
              return (
                <div key={index} className="col-4">
                  <div className="tripDisplay shadow rounded border">
                    <div><span className="label">Travell Destination: </span>{trip.destination}</div> 
                    <div><span className="label">Departure Date: </span>{trip.departureDate} </div>
                    <div><span className="label">Return Date: </span>{trip.returnDate} </div>
                    <div><span className="label">Documents Needed: </span>{trip.necessaryDocuments}</div>
                    <div><span className="label">Hotel: </span>{trip.hotelName} </div>
                    <div><span className="label">Hotel Location: </span>{trip.hotelLocation} </div>
                  </div>
                <button className="btn btn-outline-danger" onClick={() => this.deleteTrip(trip.id)}>
                  Delete
                </button>
                <button className="btn btn-outline-secondary" onClick={() => this.props.editTrip(trip.id)}>
                  Edit
                </button>
                </div>
              )
            })}
            </div>
        </div>
      </div>
    )}
 }
