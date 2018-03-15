import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public userservice:UserService) {}

  ngOnInit() {
  }

  ngDoCheck() {

  }


  Cerrar() {
    this.userservice.logOut();
  }

}
