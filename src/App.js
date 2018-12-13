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

  closeAllMarkers=()=>{
      const markers=this.state.markers.map(marker=>{
          marker.isOpen=false;
          return marker
      });
      this.setState({markers:Object.assign(this.state.markers,markers)})
  };

  handleMarkerClick=(marker)=>{
    this.closeAllMarkers();
    marker.isOpen=true;
    this.setState(({markers:Object.assign(this.state.markers,marker)}));
    const venue=this.state.venues.find((venue)=>{
       return venue.id===marker.id;
    });
    console.log(venue,"NEW VENUE");
    SquareAPI.venueDetails(marker.id).then((res)=>{
        console.log(res);
        const newVenue=Object.assign(venue,res.response.venue);
        console.log(newVenue,"new Venue");
        this.setState({venues:Object.assign(this.state.venues,newVenue)});
    })
  };

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
                isVisible:true,
                id:venue.id
            }
        });
        this.setState({venues,center,markers});
    });
  }

  render() {
    return (
      <div className="App">
        <Map {...this.state}
         handleMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default App;
