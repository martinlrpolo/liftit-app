import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapsConfig from '../../config/MapsConfig';

class MyMap extends Component <any, any>{
  constructor(props : any) {
    super(props);
    this.state = {
      zoom: 5,
      data:{
        fromRoute:'',
        toRoute:'',
        distance:'',
        time:''
      }
    };
  }

  componentDidMount(){
    this.setState({
      center: this.props.center,
      fromRoute:this.props.fromRoute,
      fromLatLong:this.props.fromLatLong,
      toLatLong: this.props.toLatLong,
      toRoute:this.props.toRoute
    }); 

    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = "https://maps.googleapis.com/maps/api/distancematrix/json?"+
   "origins=" + this.props.fromLatLong.lat + "," + this.props.fromLatLong.lng +
   "&destinations=" + this.props.toLatLong.lat + "," + this.props.toLatLong.lng +
   "&key=" + MapsConfig.apiKey;
    
    fetch(encodeURI(proxyurl + url))
      .then(res => res.json())
      .then((contents) => {
        console.log(contents)
          this.setState(
            { data: 
              {
                distance : contents.rows[0].elements[0].distance.text,
                time : contents.rows[0].elements[0].duration.text
              }
            }
          )
      })
    .catch(console.log)

  }

  /**
   *  Calculate Car route Google Map
   */
 handleGoogleMapApi = (google : any) => {
  var flightPath = new google.maps.Polyline({
    path: this.state.path,
    geodesic: true,
    strokeColor: '#33BD4E',
    strokeOpacity: 1,
    strokeWeight: 5
  });
  flightPath.setMap(google.map)
  
  let directionsService = new google.maps.DirectionsService()
  var directionsDisplay = new google.maps.DirectionsRenderer()
  directionsDisplay.setMap(google.map)
  
  directionsService.route(
    {
      travelMode: 'DRIVING',
      origin: this.state.fromRoute,
      destination: this.state.toRoute
    },
    (DirectionsResult : any, DirectionsStatus : any) => {
      directionsDisplay.setDirections(DirectionsResult);
    }
  )
}

/**
 *  Render Map
 */
map(){
    return (
      
      <div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Mi Mapa</h6>
          </div>
          <div className="card-body">
            <div>
                <strong>Origen: </strong> {this.state.fromRoute} 
                <strong> Destino: </strong> {this.state.toRoute}
              </div>
              <div>
                <strong>Distancia: </strong> {this.state.data.distance} 
                <strong> Tiempo: </strong> {this.state.data.time}
              </div>
              <hr/>
            <div style={{ height: '600px', width: '100%' }}>
            <GoogleMapReact
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={this.handleGoogleMapApi}
              bootstrapURLKeys={{ key: MapsConfig.apiKey }}
              center={this.state.center}
              defaultZoom={this.state.zoom}
            ></GoogleMapReact>
            </div>           
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        
        <div className="row">
          <div className="col-md-12">
            {this.map()}
          </div>
        </div>
      </div>
    );
  }

}

export default MyMap;

