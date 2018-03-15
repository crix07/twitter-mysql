import { Component, OnInit } from '@angular/core';
import * as swal from 'sweetalert';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
public forma:FormGroup;
  constructor(public usserService:UserService, public router:Router) {}

  ngOnInit() {
    this.forma = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, Validators.required)
    });
  }


  login() {
    if (this.forma.invalid) {
      swal('Importante', 'ingresa tus datos correctamente', 'warning');
    } else {
      this.usserService.ingresar(this.forma.value)
      .subscribe(() => {
        this.router.navigate(['/']);
        swal('Bien', 'Has iniciado sesion correctamente', 'success')
      }, err => {
        swal('Importante', err.error.message, 'warning');
      }
      );
    }
  }

}
