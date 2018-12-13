import React, { Component } from 'react';
import Map from './component/Map';
import './App.css';
import SquareAPI from "./API/index"

class App extends Component {

  constructor(){
      super();
      this.state={
          venues:[],
          markers:[],
          center:[],
          zoom:12
      };
  }

  componentDidMount(){
    SquareAPI.search({
        near:"Austin,TX",
        query:"tacos",
        limit:10
    }).then((results)=>{
      //console.log(results);
        const {venues}=results.response;
        const {center}=results.response.geocode.feature.geometry;
        const markers=venues.map((venue)=>{
            return {
                lat:venue.location.lat,
                lng:venue.location.lng,
                // To show info windows hidden by default
                isOpen:false,
                // To show markers if true
                isVisible:true
            }
        });
        this.setState({venues,center,markers});
    });
  }

  render() {
    return (
      <div className="App">
        <Map {...this.state} />
      </div>
    );
  }
}

export default App;
