import React,{Component} from "react"

import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow} from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    <GoogleMap
        defaultZoom={8}
        zoom={props.zoom}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={props.center}
    >

        {props.markers &&
            props.markers
                .filter(marker=>marker.isVisible)
                .map((marker,index)=>{

                 const venueInfo=props.venues.find((venue)=>{
                     return venue.id===marker.id;
                 });
                 console.log(venueInfo);

                 return(
                    <Marker
                        key={index}
                        position={{lat:marker.lat,lng:marker.lng}}
                        onClick={()=>props.handleMarkerClick(marker)}
                    >
                        {marker.isOpen && <InfoWindow>
                            <p>Hello</p>
                        </InfoWindow>}
                    </Marker>
                )})
        }
    </GoogleMap>
));

class Map extends Component{

       render(){
        return(
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBP7rV74uLMGdvy8rP17jnp2jVmJ9tXqkg"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default Map;