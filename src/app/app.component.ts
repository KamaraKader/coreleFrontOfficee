import {Component, OnInit} from '@angular/core';
 //import defaultLanguage from "../assets/i18n/fr.json"
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    public translateService: TranslateService,

  ) {
    localStorage.setItem('lang', 'fr')
    this.translateService.setDefaultLang('fr');
    this.translateService.use( 'fr' || localStorage.getItem('lang'));}

  ngOnInit() {

  }
  title = 'gate_front';

}
