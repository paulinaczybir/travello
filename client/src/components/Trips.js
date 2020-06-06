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

  tripDetails = (trip, index) => {
    return (
      <div key={index} className="trip-display shadow rounded border">
        <div className="trip-header">
          <span className="trip-destination">{trip.destination}</span><br/>
          <span className="trip-dates">{trip.departureDate} - {trip.returnDate}</span>
        </div>
        {trip.flights.slice(0,2).map((flight, index) => <div className="trip-flight">
          <div className="flight-stop">
            <span className="flight-airport">{flight.departureAirport}</span><br/>
            <span className="flight-time">{flight.departureTime}</span>
          </div>
          <div className="plane-icon">
            <i className="fas fa-plane"></i>
          </div>
          <div className="flight-stop">
            <span className="flight-airport">{flight.arrivalAirport}</span><br/>
            <span className="flight-time">{flight.arrivalTime}</span>
          </div>
        </div>)}
        <div className="trip-hotel">
          <i className="fas fa-hotel"></i>
          <span className="hotel-name">{trip.hotelName}</span>
          <span className="hotel-location">{trip.hotelLocation}</span>
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
  }
  

  render() {
    return (
      <div className="trips-container">
        <Link to='/trips/new'>
        <button id="new-trip-btn" className="btn btn-secondary btn-lg">Create new trip</button>
        </Link>
          <div className="trip-details-container">
            {this.state.allTrips.map(this.tripDetails)}
          </div>
      </div>
    )}
 }
