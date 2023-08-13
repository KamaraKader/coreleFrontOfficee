import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {TransferItem} from "ng-zorro-antd/transfer";
import {MenuServices} from "../../../services/menu.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-habilitations',
  templateUrl: './habilitations.component.html',
  styleUrls: ['./habilitations.component.css']
})
export class HabilitationsComponent implements OnInit {
  idTypeUser: any;
  libelle: any;
  titre: any;
  list: TransferItem[] = [];
  disabled = false;
  loading = false;
  dataMenu: any = [];
  searchInput: any;
  menuArray: any = [];

  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router,
              private menuSvce: MenuServices,
              private message: NzMessageService
              ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((p: any) => {
      if (p.filter){
        const valueOfQueryParam =  JSON.parse(p.filter)

        // console.log('valueOfQueryParam====>', valueOfQueryParam)

        this.idTypeUser = valueOfQueryParam[0].idType
        this.libelle = valueOfQueryParam[1].libelle
      }
    });

    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }

    this.titre = this.translate.instant('gestion.des.habillitations.des') + ' ' + '[' +this.libelle+ ']'
    this.getMenu()

 //   console.log('this.idTypeUser==>', this.idTypeUser)

  }


  getMenu() {
    this.loading = true;
    this.menuSvce.getMenu().subscribe(
      (data:any) => {
        this.loading = false;
        //  console.log('dataaaa', data)
        this.dataMenu = data;
        //   console.log(this.moduleListes);
      },
      error => {
        //   console.log('---->',error.error.message);
         this.message.error(this.translate.instant(error.error.message))
      //  this.message.error(error.error.message)
        this.loading = false;

      }
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any



  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('nzSearchChange', ret);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

  retourPage() {
    this.router.navigate(['/private/type-user'], {skipLocationChange: true});
  }

  selectMenu(event: any, item: any) {
    if(event) {
      this.menuArray.push({
        title: item.title,
        code: item.code,
        typeUserId: this.idTypeUser,
        path: item.path
      })
    } else {
      this.menuArray.splice(event, 1);
   //  this.menuArray = this.menuArray.filter((el: any) => el.code != item.id)
    }
     //  console.log('event', event)
    // console.log(item.id)

    console.log(this.menuArray)
  }

  searchMenu() {

  }

  getDeleteValue(item: any) {

  }

  confirm() {

  }

  cancel() {

  }
}
