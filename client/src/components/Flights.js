import React, { Component } from "react";
import AddFlight from './AddFlight';

class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
    };
  }

  componentDidMount() {
    this.getFlights(this.props.tripId);
  }

  getFlights = () => {
    fetch(`/trips/${this.props.tripId}/flights`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ flights: response });
      });
  };
  deleteFlight = flightId => {
    fetch(`/trips/${this.props.tripId}/flights/${flightId}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          flights: response
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

    updateFlights = flights => {
      this.setState({flights: flights});
    }

  render() {
    return (
      <div>
        <AddFlight updateFlights={this.updateFlights} tripId={this.props.tripId} />
        <div className="container">
          <div className="row">
            {this.state.flights.map((flight, index) => {
              return (
                <div key={index} className="col-4">
                  <div className="tripDisplay shadow rounded border">
                    <div>
                      <span className="label">Airline: </span>
                      {flight.airline}{" "}
                    </div>
                    <div>
                      <span className="label">Flight Number: </span>
                      {flight.flightNumber}
                    </div>
                    <div>
                      <span className="label">Departure Airport: </span>
                      {flight.departureAirport}{" "}
                    </div>
                    <div>
                      <span className="label">Arrival Airport: </span>
                      {flight.arrivalAirport}{" "}
                    </div>
                    <div>
                      <span className="label">Departure Time: </span>
                      {flight.departureTime}
                    </div>
                    <div>
                      <span className="label">Arrival Time: </span>
                      {flight.arrivalTime}{" "}
                    </div>
                    <div>
                      <span className="label">Reservation Id: </span>
                      {flight.reservationId}{" "}
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => this.deleteFlight(flight.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Flights;
