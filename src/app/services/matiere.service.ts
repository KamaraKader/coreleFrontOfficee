import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



const API_URL = environment.API_URL + '/matieres'

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) {}


  get(){
   // console.log(localStorage.getItem('JWT_NAME'));
    return this.http.get(API_URL, {headers: {
      Authorization: 'Bearer ' + localStorage.getItem('JWT_NAME')
    }});
  }

  getbyId(id: string) {
    return this.http.get(`${API_URL}/${id}`)
  }

  create(data: any) {
    return this.http.post(API_URL, data)
  }

  update(code:any ,data: any) {
    return this.http.patch(`${API_URL}/${code}`, data)
  }

  delete(id: string) {
    return this.http.delete(`${API_URL}/${id}`)
  }




}
