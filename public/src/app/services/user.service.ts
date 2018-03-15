import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import global from '../global';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Injectable()
export class UserService {

  public usuario:any;
  public id:string;
  public token:string;
  constructor(public http:HttpClient, public router:Router) {
    this.cargarStorage();
  }


  cargarStorage() {
    if( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token')
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.id = localStorage.getItem('id');
    } else {
      this.token = '';
      this.usuario = null;
      this.id = '';
    }
  }


  logOut() {
    this.usuario = null;
    this.token = '';
    this.id = '';
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('id')

    this.router.navigate(['/']);
  }

  guardarStorage(id:string, token:string, usuario:any) {

    localStorage.setItem('id', id),
    localStorage.setItem('token', token),
    localStorage.setItem('usuario', JSON.stringify(usuario))

    this.usuario = usuario;
    this.token = token;
    this.id = id;
  }


  verificar(token) {
    return this.http.get(global.apiURL+'/activation/'+token);
  }


  crearUsuario(user) {
    let body = JSON.stringify(user)
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post(global.apiURL+'/register', body, {headers});
  }

  ingresar(user) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post(global.apiURL+'/login', body, {headers})
      .map((res:any) => {
        this.guardarStorage(res.user.id, res.user.token, res.user)
        return true;
      });
  }




}
