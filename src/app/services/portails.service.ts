import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



const API_URL = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class PortailsService {

  constructor(private http: HttpClient) {}


  getModules(){
   // console.log(localStorage.getItem('JWT_NAME'));
    return this.http.get(API_URL + '/cmodules', {headers: {
      Authorization: 'Bearer ' + localStorage.getItem('JWT_NAME')
    }});
  }

  getModulesByUserConnected(){
    // console.log(localStorage.getItem('JWT_NAME'));
    return this.http.get(API_URL + '/cusers_modules/connectedUser/modules', {headers: {
        Authorization: 'Bearer ' + localStorage.getItem('JWT_NAME')
      }});
  }


  getAuthenticatedUser(){
    return this.http.get(`${API_URL}/cusers/me` ,{headers: {
      Authorization: 'Bearer ' + localStorage.getItem('JWT_NAME')
    }})
 }




}
