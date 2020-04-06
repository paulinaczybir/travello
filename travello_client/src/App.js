import React from 'react';
import './App.css';
import { render } from 'react-dom';
import Editing from './components/Editing';
import Trips from './components/Trips';
import NewTripForm from './components/NewTripForm';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEdit: false,
      newTripFormView: false,
      tripId: []
    }
  };

  editTrip = (tripId) => {
    this.setState({
      currentEdit: true,
      newTripFormView: false,
      tripId: tripId
    })
  }

  returnToMain = () => {
    this.setState({
      currentEdit: false,
      newTripFormView: false
    })
  }

  addTripView = () => {
    this.setState({
      currentEdit: false,
      newTripFormView: true
    })
  }

  toggleView = () => {
    if (this.state.currentEdit && !this.state.newTripFormView) {
      return <Editing returnToMain={this.returnToMain} tripId={this.state.tripId} />;
    } else if (!this.state.currentEdit && !this.state.newTripFormView) {
      return <Trips editTrip={this.editTrip} addTripView={this.addTripView} />;
    } else if (!this.state.currentEdit && this.state.newTripFormView) {
      return <NewTripForm returnToMain={this.returnToMain} />; 
    }
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Travello</h1>
        </header>
        <div>
          {this.toggleView()}
        </div>
      </div>
    );
  }
}

export default App;
