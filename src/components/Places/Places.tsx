import React, { Component } from 'react';
import './Places.css';
import fire from '../../config/Fire';
import AddPlace from '../AddPlace/AddPlace';
import MyMap from '../MyMap/MyMap';
import  {geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MapsConfig from '../../config/MapsConfig';

class Places extends Component<any, any>{
  public ref: any;
  unsubscribe: null;
  constructor(props: any) {
    super(props);
    this.unsubscribe = null;
    this.ref = fire.firestore().collection('services');
    this.selectRoute = this.selectRoute.bind(this);
    this.assignRoute = this.assignRoute.bind(this);
    this.state = {
      services: [],
      toRoute: '',
      fromRoute: '',
      drawedMap:''
    };
  }

  /**
   *  Get All Routes
   */
  onCollectionUpdate = (querySnapshot: any) => {
    const services: any = [];
    querySnapshot.forEach((service: any) => {
      const { emailUser, fromRoute, toRoute } = service.data();
      if(emailUser === localStorage.getItem('myemail')){
        services.push({
          key: service.id,
          service,
          emailUser,
          fromRoute,
          toRoute
        });
      }
    });
    this.setState({
      services
    });
  }

  /**
   *  On load Component
   */
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  delete = (id: any) => {
    this.ref.doc(id).delete();
  }

  selectRoute = async (route: any) => {
    let distance = {};
    await geocodeByAddress(route).then(results => getLatLng(results[0])).then(latLng => 
      distance = latLng,
    );
    return distance;
  }

  async assignRoute(item : any){
    this.setState({ drawedMap : '' });
    let from = await this.selectRoute(item.fromRoute);
    let to = await this.selectRoute(item.toRoute);
    this.setState({ drawedMap : 
        <MyMap 
        center={from} 
        fromRoute={item.fromRoute} 
        toRoute={item.toRoute}
        fromLatLong={from}
        toLatLong={to}
      ></MyMap> 
    });
  }

  /**
   *  Render method
   */
  render() {
    return (

      <div className="row">
        <div className="col-md-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Mis rutas</h6>
          </div>
          <div className="card-body">

            <ul className="list-group">
              {this.state.services && this.state.services.map((item: any, key: any) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={key}>
                  <strong>De:</strong> {item.fromRoute} <strong> Hasta:</strong> {item.toRoute}
                  <span className="badge badge-primary badge-pill">
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-primary" onClick={() => this.assignRoute(item)}><i className="fas fa-eye"></i></button>
                      <button type="button" className="btn btn-danger" onClick={() => this.delete(item.key)}><i className="fas fa-trash"></i></button>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
            <hr />
            <AddPlace></AddPlace>
          </div>
        </div>
        </div>
        <div className="col-md-6">
          {this.state.drawedMap}
        </div>
      </div>

    );
  }

}

export default Places;

