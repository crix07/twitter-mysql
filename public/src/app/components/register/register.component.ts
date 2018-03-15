import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
public forma:FormGroup;
  constructor(public userservice:UserService, public router:Router) {}

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, Validators.required)
    });
  }

  register() {
    if (this.forma.invalid) {
      swal('Importante', 'ingresa tus datos correctamente', 'warning');
    } else {
      this.userservice.crearUsuario(this.forma.value)
          .subscribe((res:any) => {
            swal('Bien', 'Te has registrado correctamente, revisa tu email para validar', 'success');
            this.router.navigate(['/login']);
          }, err => {
            console.log(err);
          });
    }
  }

}
