import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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
    fetch("/trips")
      .then(response => response.json())
      .then(response => {
        this.setState({ allTrips: response });
      });
  };


  deleteTrip = i => {
    fetch(`/trips/${i}`, {
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
      <div className="container">
        <h3>Welcome to Travello!</h3>
        <p>Keep all of your trip details in one place and enjoy stress-free travelling!</p>
        <Link to='/trips/new'>
        <button id="newTripBtn" className="btn btn-secondary btn-lg">Create new trip</button>
        </Link>
        <div className="container">
          <div className="row"> 
            {this.state.allTrips.map((trip, index) => {
              return (
                <div key={index} className="col-4">
                  <div className="tripDisplay shadow rounded border">
                    <div><span className="label">Travel Destination: </span>{trip.destination}</div> 
                    <div><span className="label">Departure Date: </span>{trip.departureDate} </div>
                    <div><span className="label">Return Date: </span>{trip.returnDate} </div>
                    <div><span className="label">Documents Needed: </span>{trip.necessaryDocuments}</div>
                    <div><span className="label">Hotel: </span>{trip.hotelName} </div>
                    <div><span className="label">Hotel Location: </span>{trip.hotelLocation} </div>
                  </div>
                <button className="btn btn-outline-danger" onClick={() => this.deleteTrip(trip.id)}>
                  Delete
                </button>
                <Link to="/trips/edit">
                  <button className="btn btn-outline-secondary" onClick={() => this.props.editTrip(trip.id)}>
                   Edit
                  </button>
                </Link>
                </div>
              )
            })}
            </div>
        </div>
      </div>
    )}
 }
