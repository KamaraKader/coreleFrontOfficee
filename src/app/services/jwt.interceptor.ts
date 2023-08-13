import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_NAME } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from "@angular/router";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    public jwtHelper: JwtHelperService,
    private router: Router,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JWT_NAME');
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if(token){
      const cloneReq = request.clone({
        headers: request.headers.set('Authorisation', 'Bearer ' + token)
      });
      console.log('---->>>',cloneReq);
      return next.handle(cloneReq)
    } else if (!isTokenExpired){
      this.router.navigate(['public/expire'])
    }
    // else{
    //   return next.handle(request);
    // }
    return next.handle(request);
  }

}
