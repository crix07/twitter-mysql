import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { PublicationsService } from '../../services/publications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  public forma:FormGroup;
  constructor(public userservice:UserService, public publicService:PublicationsService) {
    this.all();
  }

  ngOnInit() {
    this.forma = new FormGroup({
      text: new FormControl(null, Validators.required)
    });
  }


  all() {

  }

  publicar() {
    let body = {
      user: this.userservice.id,
      text: this.forma.value.text
    }
    if (this.forma.invalid) {
      swal('Importante', 'debes escribir una publicacion', 'warning');
    } else {
      this.publicService.savePublic(body)
        .subscribe((res:any) => {
           if(res) {

           }
        });
    }
  }

}
