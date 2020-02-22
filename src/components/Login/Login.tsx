import React, { Component } from 'react';
import fire from '../../config/Fire';
import './Login.css';
import Swal from 'sweetalert2'

class Login extends Component <{}, any>{

  constructor(props : any) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  /**
   *  Save input values on change
   * @param e 
   */
  handleChange(e : any) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Login for registred users, this data called from Firebase
   * @param e 
   */
  login(e : any) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        localStorage.setItem('myemail', this.state.email);
    }).catch((error : any) => {
        Swal.fire({
            title: 'Error!',
            text: 'Verificar credenciales de acceso',
            icon: 'error',
            confirmButtonText: 'Cool'
        })          
    });
  }

  /**
   * Register for new Users, this data will save in Firebase
   * @param e 
   */
  signup(e : any){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }

  /**
   *  Render Method :)
   */
  render() {
    return (


      <div className="Login">


            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Bienvenidos</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="email" onChange={this.handleChange} className="form-control form-control-user" name="email" placeholder="Email" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" onChange={this.handleChange} className="form-control form-control-user" name="password" placeholder="Contraseña" />
                                                </div>
                                                <button type="button" onClick={this.login} className="btn btn-primary btn-user btn-block">
                                                    Ingresar
                                                </button>
                                                <button type="button" onClick={this.signup} className="btn btn-success btn-user btn-block">
                                                    Registro
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
  }
}
export default Login;

