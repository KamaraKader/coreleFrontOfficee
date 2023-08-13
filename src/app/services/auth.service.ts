import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Router} from "@angular/router";

//import { environment } from src/environments/environment'


//const USER_AUTH_API_URL = 'http://localhost:3001/auth/login';

const USER_AUTH_API_URL = environment.API_GATE_URL + '/auth/login';
const BASE_URL = environment.API_URL + '/cusers'
export const JWT_NAME = 'accees_token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }


  login(username: string, password: string) {
    return this.http.post<any>(USER_AUTH_API_URL, { username, password })
    .pipe(map(token => {
        if (token) {
            localStorage.setItem('JWT_NAME', token.access_token);
            localStorage.setItem('expire', token.expires_in)
            localStorage.setItem('REFRESH_TOKEN', token.refresh_token)
            localStorage.setItem('REFRESH_EXPIRE', token.refresh_expires_in
)
        }
        return token;
    }));
  }

  deconnexion(){
    this.router.navigate(['/'])
    localStorage.removeItem('JWT_NAME')
    localStorage.removeItem('REFRESH')
    localStorage.removeItem('User_connected')
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  forgotPassword(data:any){
   return this.http.patch(`${BASE_URL}/forgot_password/send`, data)
  }

  setPassword(data:any){
    return this.http.patch(`${BASE_URL}/forgot_password/set_password`,data)
  }


  initPassword(data:any){
    return this.http.patch(`${BASE_URL}/init/password`,data, {headers: {
      Authorization: 'Bearer ' + localStorage.getItem('JWT_NAME')
    }})
  }
}

// /cusers/init/password


