import { Component, OnInit } from '@angular/core';
import { PortailsService } from 'src/app/services/portails.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '../../../../environments/environment';
import {NavService} from "../../../services/nav.service";
import {MenuService} from "ng-zorro-antd/menu";
import {MenuServices} from "../../../services/menu.service";

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.css']
})
export class PortailComponent implements OnInit {

  moduleListes: any;
  loading: boolean = false;
  switchValue = false;

  gridStyle = {
    width: '100%',
    textAlign: 'left'
  };
 // url!: "http://localhost:55957/dashboard/home";

  constructor(private portailService: PortailsService,private router: Router,
    private message: NzMessageService,
              private navService: NavService,
              private menuSvce: MenuServices
    ) { }

  ngOnInit(): void {
 //   this.getConnecteUser()
    this.getMenu()
  }

  getMenu() {
    this.loading = true;
    this.menuSvce.getMenu().subscribe(
      (data:any) => {
        this.loading = false;
      //  console.log('dataaaa', data)
        this.moduleListes = data;
     //   console.log(this.moduleListes);
      },
      error => {
     //   console.log('---->',error.error.message);
        this.message.error(error.error.message)
        this.loading = false;

      }
    )
  }


/*  getModules(){
    this.loading = true;
    this.portailService.getModulesByUserConnected().subscribe(
      (data:any) => {
        this.loading = false;
        this.moduleListes = data[0];
        console.log(this.moduleListes);
      },
      error => {
        console.log('---->',error.error);
        this.message.error(error.error)
        this.loading = false;

      }
    )
  }*/


/*  getConnecteUser(){
    this.portailService.getAuthenticatedUser().subscribe(
      (res:any)=>{

          this.navService.emitNavChangeEvent(res);
          console.log('user_connectedValue==>', res);
          localStorage.setItem('User_connected', JSON.stringify(res));
          this.getModules()

      },
      error => {
        console.log('---->',error.error.message);
        if(error.error.message === 'Veuillez initialiser votre mot de passe'){
          this.router.navigate(['/init-password'])
        }
      }
    )
  }*/



/*  goToLink(data: any){
  //  console.log(data.module?.url)
    // console.log(data.module?.code)
   // return
    const gtl= localStorage.getItem('JWT_NAME');
    const getTokenExpire = localStorage.getItem('expire')
    const getRefreshToken = localStorage.getItem('REFRESH_TOKEN')
    const getRefreshTokenExpire = localStorage.getItem('REFRESH_EXPIRE')
    const encodeValue = encodeURIComponent(gtl!);
    const encodedRefreshToken = encodeURIComponent(getRefreshToken!);
    const encodedTkoenExpire = encodeURIComponent(getTokenExpire!)
    const encodedRefreshTokenExpire = encodeURIComponent(getRefreshTokenExpire!)
    // const baseUrl = environment.CORE_URL;
    const baseUrl = data.module?.code === 'M0' ? environment.CORE_URL : data.module?.code === 'M1' ? environment.AGENCY_URL : '';
    const fullUrl = `${baseUrl}?key=${encodeValue}&tokenExpire=${encodedTkoenExpire}&refreshkey=${encodedRefreshToken}&refreshTokenExpire=${encodedRefreshTokenExpire}&module=${data.module?.code}`;
    window.location.href = fullUrl;
 }*/

  goToLink(data: any) {

  //  console.log(data)

    this.router.navigate([data.path], {skipLocationChange: true});
  }
}
