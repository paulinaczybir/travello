import React from 'react';
import './App.css';
import { render } from 'react-dom';
import Editing from './components/Editing';
import Trips from './components/Trips';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEdit: false
    }
  };

  editTrip = (tripId) => {
    this.setState({
      currentEdit: true
    })
  }

  returnToMain = () => {
    this.setState({
      currentEdit: false
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Travello</h1>
        </header>
        <div>
          {this.state.currentEdit? <Editing returnToMain={this.returnToMain} />: <Trips editTrip={this.editTrip}  />} 
        </div>
      </div>
    );
  }
}

export default App;
