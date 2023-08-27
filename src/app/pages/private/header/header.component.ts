import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../services/auth.service";
import {NavService} from "../../../services/nav.service";
import {MenuServices} from "../../../services/menu.service";
import {NzMessageService} from "ng-zorro-antd/message";



const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'fr',
    name: 'Français',
    flag: './assets/media/flags/france.svg',
  },
];


interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  langs = languages;
  language: LanguageFlag | undefined;
  lang: any
  userValue: any
  userConnected: any
  subscription: any;
  loading = false;
  moduleListes: any = [];

  constructor(private translate: TranslateService,
              private authenticatedUser: AuthService,
              private navService: NavService,
              private menuSvce: MenuServices,
              private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'fr';

    this.subscription = this.navService.getNavChangeEmitter()
    //  .subscribe((item: any) => console.log('itemmmmmmmmmmm',item.user))
      .subscribe((item: any) => this.userConnected = item);

    console.log('uservalue===============>', this.userValue)

    // this.userValue= localStorage.getItem(('User_connected'));

 //  this.userConnected = this.userValue
  // console.log('userrrrrrrrrrrrrr', this.userValue)

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


  selectLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this.lang = lang
    this.translate.setDefaultLang(lang)
    this.translate.use(lang)
  }

  deconnexion() {
    this.authenticatedUser.deconnexion()
  }
}
