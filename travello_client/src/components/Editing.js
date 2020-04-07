import React, { Component } from 'react'

export default class Editing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editDestination: "",
      editDepartureDate: "",
      editReturnDate: "",
      editNecessaryDocuments: "",
      editHotelName: "",
      editHotelLocation: ""
    }
  }

  componentDidMount() {
    this.getTripById(this.props.tripId);
  }

  getTripById = id => {
    fetch(`/users/${this.props.tripId}`)
      .then(res => res.json())
      .then(response => {
        console.log(`this is response`, response);
        this.setState({
          editDestination: response.destination,
          editDepartureDate: response.departureDate,
          editReturnDate: response.returnDate,
          editNecessaryDocuments: response.necessaryDocuments,
          editHotelName: response.hotelName,
          editHotelLocation: response.hotelLocation
        });
      });
  };

  saveChanges = event => {
    event.preventDefault();
    fetch(`/users/${this.props.tripId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: this.state.editDestination,
        departureDate: this.state.editDepartureDate,
        returnDate: this.state.editReturnDate,
        necessaryDocuments: this.state.editNecessaryDocuments,
        hotelName: this.state.editHotelName,
        hotelLocation: this.state.editHotelLocation
      }),
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
        <h4>Here you can edit your trip details.</h4>
        <div>
        <form onSubmit={this.saveChanges}>
          <label>Destination:</label><br />
          <input onChange={this.handleInputChange} type="text" id="editDestination" name="editDestination" defaultValue={this.state.editDestination} /><br />
          <label>Departure Date:</label><br />
          <input onChange={this.handleInputChange} type="text" id="editDepartureDate" name="editDepartureDate" defaultValue={this.state.editDepartureDate} /><br />
          <label>Return Date:</label><br />
          <input onChange={this.handleInputChange} type="text" id="editReturnDate" name="editReturnDate" defaultValue={this.state.editReturnDate} /><br />
          <label>Necessary Documents:</label><br />
          <input onChange={this.handleInputChange} type="text" id="editNecessaryDocuments" name="editNecessaryDocuments" defaultValue={this.state.editNecessaryDocuments} /><br />
          <label>Hotel:</label><br />
          <input onChange={this.handleInputChange} type="text" id="editHotelName" name="editHotelName" defaultValue={this.state.editHotelName} /><br />
          <label>Hotel Location:</label><br />
          <input onChange={this.handleInputChange} type="text" id="editHotelLocation" name="editHotelLocation" defaultValue={this.state.editHotelLocation} /><br />
          <input className="btn btn-secondary" type="submit" value="Save your changes" />
        </form>
        </div>
        <button className="btn btn-secondary" onClick={this.props.returnToMain}>Back to your trips</button>
      </div>
    )
  }
}
