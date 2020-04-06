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
        <div className="container">
          <div className="row"> 
            {this.state.allTrips.map((trip, index) => {
              return (
                <div key={index} className="col-4">
                <span className="border">
                <span>
                  <div>You are travelling to: {trip.destination}</div> 
                  <div>Departure Date: {trip.departureDate} </div>
                  <div>Return Date: {trip.returnDate} </div>
                  <div>Documents you need: {trip.necessaryDocuments}</div>
                  <div>Hotel: {trip.hotelName} </div>
                  <div>Hotel Location: {trip.hotelLocation} </div>
                </span>
                <button className="btn btn-outline-danger" onClick={() => this.deleteTrip(trip.id)}>
                  Delete
                </button>
                <button className="btn btn-outline-secondary" onClick={() => this.props.editTrip(trip.id)}>
                  Edit
                </button>
                </span>
                </div>
              )
            })}
            </div>
          <button className="btn btn-secondary" onClick={() => this.props.addTripView()}>Create new trip</button>
        </div>
      </div>
    )}
 }
