import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../services/auth.service";
import {NavService} from "../../../services/nav.service";



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
  constructor(private translate: TranslateService, private authenticatedUser: AuthService,private navService: NavService) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'fr';

    this.subscription = this.navService.getNavChangeEmitter()
    //  .subscribe((item: any) => console.log('itemmmmmmmmmmm',item.user))
      .subscribe((item: any) => this.userConnected = item);

    console.log('uservalue===============>', this.userValue)

    // this.userValue= localStorage.getItem(('User_connected'));

 //  this.userConnected = this.userValue
  // console.log('userrrrrrrrrrrrrr', this.userValue)
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
