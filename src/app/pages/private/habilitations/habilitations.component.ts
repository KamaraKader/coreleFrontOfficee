import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {TransferItem} from "ng-zorro-antd/transfer";
import {MenuServices} from "../../../services/menu.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {TypeUserMenuService} from "../../../services/type.user.menu.service";

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
  dataMenuTypeUser: any = [];
  searchInputAut: any;
  isLoadingBtn = false;
  typeUsermenuDataTemp: any = [];
  idMenuAut: any;

  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router,
              private menuSvce: MenuServices,
              private message: NzMessageService,
              private typeUserMenuSvce: TypeUserMenuService
              ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((p: any) => {
      if (p.filter){
        const valueOfQueryParam =  JSON.parse(p.filter)

        // console.log('valueOfQueryParam====>', valueOfQueryParam)

        this.idTypeUser = valueOfQueryParam[0].idType
        this.libelle = valueOfQueryParam[1].libelle

        this.getMenuByTypeUser(this.idTypeUser)
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

  getMenuByTypeUser(idTypeUser: any) {
    this.loading = true;
    this.typeUserMenuSvce.getByTypeUser(idTypeUser).subscribe(
      (data:any) => {
        this.loading = false;
        //  console.log('dataaaa', data)
        this.dataMenuTypeUser = data;
        this.typeUsermenuDataTemp = this.dataMenuTypeUser
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
    // ggg
  }

  searchMenu() {

  }

  getDeleteValue(item: any) {
    this.idMenuAut = item.id
  }

  confirm() {
    this.typeUserMenuSvce.delete(this.idMenuAut)
      .subscribe(
        response => {
          //   console.log('responseee==>', response);
          if (response) {
            this.message.success(this.translate.instant('supprimer.avec.succes'), {
              nzDuration: 5000
            });
            this.getMenuByTypeUser(this.idTypeUser);
          }
          //  this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  cancel() {

  }

  searchMenuAut() {

  }

  submitAffecte() {
    this.isLoadingBtn = true
    if (this.menuArray.length === 0) {
      this.message.error(this.translate.instant('veuillez.selectionner.un.menu'), {
        nzDuration: 5000
      });
      this.isLoadingBtn = false
      return
    }

    //Verifier si les menus sélectionné existe deja

    for (let i =0; i < this.menuArray.length; i++) {
      const el = this.menuArray[i]
      let isExist = false
      this.typeUsermenuDataTemp?.forEach((sh: any) => {
        if(el.code == sh.code?.id) isExist = true
      })

      if(isExist) {
        //message d'errur

        this.message.error(this.translate.instant('veuillez.decocher.les.menu.deja.autorise'), {
          nzDuration: 5000
        });
        this.isLoadingBtn = false
        return;
      }
    }

    //return;
    this.typeUserMenuSvce.create(this.menuArray)
      .subscribe(
        response => {
          // console.log('responseee==>', response);
          if (response) {
            this.message.success(this.translate.instant('ajouter.avec.succes'), {
              nzDuration: 5000
            });
            this.getMenu()
            this.getMenuByTypeUser(this.idTypeUser)
            this.isLoadingBtn = false;
            this.menuArray = []
          }
          //  this.validateBilletageForm.reset()
          //  this.submitted = true;
        },
        error => {
          this.isLoadingBtn = false;
          this.message.error(this.translate.instant(error.error.message), {
            nzDuration: 5000
          });
          console.log(error);
        });

  }
}
