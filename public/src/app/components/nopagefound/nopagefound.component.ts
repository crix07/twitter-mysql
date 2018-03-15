import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  public anio:number;

  constructor() {
    const fecha = new Date();
    this.anio = fecha.getFullYear();
  }

  ngOnInit() {
  }

}
