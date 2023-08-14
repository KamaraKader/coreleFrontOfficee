import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";



const API_URL = environment.API_URL + '/typeusermenus'

@Injectable({
  providedIn: 'root'
})
export class TypeUserMenuService {

  constructor(private http: HttpClient) {}

  get(){
    // console.log(localStorage.getItem('JWT_NAME'));
    return this.http.get(API_URL, {headers: {
        Authorization: 'Bearer ' + localStorage.getItem('JWT_NAME')
      }});
  }

  getByTypeUser(
    typeUserId: any,
  ): Observable<{}>  {
    let params = new HttpParams()
      .append('typeUserId', `${typeUserId}`)
    return this.http.get(`${API_URL}`, {
      params
    });
  }

  getbyId(id: string) {
    return this.http.get(`${API_URL}/${id}`)
  }

  create(data: any) {
    return this.http.post(API_URL + '/many', data)
  }

  update(code:any ,data: any) {
    return this.http.patch(`${API_URL}/${code}`, data)
  }

  delete(code: string) {
    return this.http.delete(`${API_URL}/${code}`)
  }




}
