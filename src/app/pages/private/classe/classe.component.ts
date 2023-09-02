import { Component, OnInit } from '@angular/core';
import {ClasseService} from "../../../services/classe.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  isLoadingBtn = false;
  isVisible = false;
  titre: any;
  tableObj: any = {};
  loading = false;
  idClasse: any;
  classeData: any = [];
  modeApelle: any;

  constructor(
    private classeSvce: ClasseService,
    private router: Router,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getClasse()
  }

  retourPage() {
    this.router.navigate(['/private'], {skipLocationChange: true});
  }

  getClasse() {
    this.loading = true
    this.classeSvce.get()
      .subscribe(
        data => {
          this.classeData = data;
          this.loading = false
          // console.log('jour==>', data);
        },
        error => {
          this.loading = false
          console.log(error);
        });
  }

  AddClasse() {
    this.modeApelle = 'ajout'
    this.isVisible = true
    this.titre = 'ajouter.classe'
  }

  submitClasse() {
    const data = {
      code: this.tableObj.code,
      libelle: this.tableObj.libelle,
      ecolesId: '0'
    }
    //  console.log('data=====>', data)

    this.isLoadingBtn = true;

    if (!this.tableObj.code || !this.tableObj.libelle) {
      this.message.error(this.translate.instant('veuillez.renseigner.les.champs.obligatoires'), {
        nzDuration: 5000
      })
      this.isLoadingBtn = false;
      return
    }

    if (this.modeApelle === 'ajout') {

      let count = this.classeData?.filter((element: { code: any; }) => element.code == this.tableObj.code).length
      if (count) {
        this.message.error(this.translate.instant('ce.code.existe.deja'), {
          nzDuration: 5000
        });
        this.isLoadingBtn = false;
        return
      }

      //   this.isLoadingOne = false;
      //  return;
      this.classeSvce.create(data)
        .subscribe(
          (response: any) => {
            console.log('responseee==>', response);
            if (response) {
              this.isLoadingBtn = false;
              this.message.success(this.translate.instant('ajouter.avec.succes'), {
                nzDuration: 5000
              });
              this.getClasse()
              this.handleCancel();
            }
          },
          error => {
            this.isLoadingBtn = false;
            this.message.error(this.translate.instant(error.error.message), {
              nzDuration: 5000
            });
            console.log(error);
          });

    } else {
      //  this.isLoadingOne = false;
      //  return;
      this.classeSvce.update(this.idClasse, data)
        .subscribe(
          response => {
            //  console.log('responseee==>', response);
            if (response) {
              this.isLoadingBtn = false;
              this.message.success(this.translate.instant('modifier.avec.succes'), {
                nzDuration: 5000
              });
              this.getClasse()
              this.handleCancel();
            }
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

  handleCancel() {
    this.isVisible = false
    this.tableObj = {}
  }

  ModalModification(item: any) {
    this.titre = this.translate.instant('modification.de.la.classe') + ' ' + item.libelle
    this.isVisible = true
    this.tableObj = item
    this.modeApelle = 'modif'
    this.idClasse = item.id
  }

  getDeleteValue(item: any) {
    this.idClasse = item.id
  }

  confirm() {
    this.classeSvce.delete(this.idClasse)
      .subscribe(
        response => {
          //   console.log('responseee==>', response);
          if (response) {
            this.message.success(this.translate.instant('supprimer.avec.succes'), {
              nzDuration: 5000
            });
            this.getClasse();
          }
          //  this.submitted = true;
        },
        error => {
          console.log(error.error.message);
        });
  }

  cancel() {

  }
}
