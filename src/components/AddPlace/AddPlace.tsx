import React, { Component } from 'react';
import './AddPlace.css';
import fire from '../../config/Fire';
import Swal from 'sweetalert2';
import InputMap from '../MyMap/InputMap';

class AddPlace extends Component<any, any>{

    public ref: any;

    constructor(props: any) {
        super(props);
        this.ref = fire.firestore().collection('services');
        this.saveData = this.saveData.bind(this);
        this.setFromRoute = this.setFromRoute.bind(this);
        this.setToRoute = this.setToRoute.bind(this);
        this.state = {
            toRoute: '',
            fromRoute: ''
        };
    }

    saveData(e: any) {
        e.preventDefault();
        if(this.state.fromRoute == '' || this.state.fromRoute == null || this.state.toRoute == '' || this.state.toRoute == null){
            Swal.fire({
                title: 'Error!',
                text: 'Todos los campos son necesarios',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }
        this.ref.add({
            emailUser: localStorage.getItem('myemail'),
            fromRoute: this.state.fromRoute,
            toRoute: this.state.toRoute
        }).then(() => {
            Swal.fire({
                title: 'Correcto!',
                text: 'Agregar correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }).catch(() => {
            console.log("error")
        });
    }

    setFromRoute(route : any){
        this.setState({fromRoute:route});
    }

    setToRoute(route : any){
        console.log(route);
        this.setState({toRoute:route});
    }

    /**
     *  Render method
     */
    render() {
        return (
            <div>
                <form className="row">
                    <div className="form-group col-md-6">
                        <label><strong>Origen: </strong> {this.state.fromRoute}</label>
                        <InputMap triggerParentUpdate={this.setFromRoute}></InputMap>
                    </div>
                    <div className="form-group col-md-6">
                        <label><strong>Destino: </strong> {this.state.toRoute}</label>
                        <InputMap triggerParentUpdate={this.setToRoute}></InputMap>
                    </div>
                    <div className="col-md-12 text-center">
                        <button type="button" className="btn btn-primary" onClick={this.saveData}>Agregar</button>
                    </div>
                </form>
            </div>
        );
    }

}

export default AddPlace;

