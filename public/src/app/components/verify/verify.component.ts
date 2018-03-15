import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styles: []
})
export class VerifyComponent implements OnInit {

  constructor(public activateroute:ActivatedRoute, public userservice:UserService) {}

  ngOnInit() {
    this.activar();
  }

  activar() {
    this.activateroute.params.subscribe(params => {
      this.userservice.verificar(params['token'])
        .subscribe((res:any) => {
          swal('Bien!', res.message, 'success');
        });
    });
  }

}
