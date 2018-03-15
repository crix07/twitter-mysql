import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import global from '../global';
@Injectable()
export class PublicationsService {

  constructor(public http:HttpClient) {}


  savePublic(body) {
    return this.http.post(global.apiURL+'/create-post', body);
  }



}
