import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import {AuthService} from "../../../services/auth.service";

@Component({
    templateUrl: './error-1.component.html'
})

export class Error1Component {
    access_token: any
    refresh_token: any
    currentDate: string | undefined;
    constructor(
        private translate: TranslateService,
        private authenticated : AuthService,
        private router: Router
    ){}


    ngOnInit() {
        this.access_token = localStorage.getItem('JWT_NAME');
        this.refresh_token = localStorage.getItem('REFRESH')
      this.getCurrentdate()
    }


    reconnecter(){
        this.router.navigate(['/'])
    }


    getCurrentdate() {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
        this.currentDate = `${day}/${month}/${year}`;
      //  console.log(this.currentDate); // "17-6-20
      }
}
