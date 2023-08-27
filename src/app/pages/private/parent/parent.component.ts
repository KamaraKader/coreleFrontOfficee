import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProfesseurService} from "../../../services/professeur.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";
import {ParentService} from "../../../services/parent.service";
import {I_Professeur} from "../../../models/professeur";
import {I_Parent} from "../../../models/parent";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  loading = false;
  parentData: any = [];
  isVisible = false;
  titre: string = 'ajouter.parent';
  tableObj: any = {};
  isLoadingBtn = false;
  modeApelle: any;
  idParent: any;

  constructor(private router: Router,
              private parentSvce: ParentService,
              private message: NzMessageService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.getParent()
  }

  ModalModification(item: any) {
    this.idParent = item.id
    this.tableObj = item
    this.modeApelle = 'modif'
    this.isVisible= true
    this.titre = this.translate.instant('modifier.parent') + ' ' + item.nom + ' ' +  item.prenom
  }

  getDeleteValue(item: any) {
    this.idParent = item.id
  }

  confirm() {
    this.parentSvce.delete(this.idParent)
      .subscribe(
        response => {
          //   console.log('responseee==>', response);
          if (response) {
            this.message.success(this.translate.instant('supprimer.avec.succes'), {
              nzDuration: 5000
            });
            this.getParent();
          }
          //  this.submitted = true;
        },
        error => {
          console.log(error.error.message);
        });
  }

  cancel() {

  }

  handleCancel() {
    this.isVisible = false
    this.tableObj = {}
  }

  submitParent() {
    const data = {
      nom: this.tableObj.nom,
      prenom: this.tableObj.prenom,
      contact: this.tableObj.contact,
      email: this.tableObj.email,
      ecolesId: '0'
    }
    //  console.log('data=====>', data)

    this.isLoadingBtn = true;

    if (!this.tableObj.nom || !this.tableObj.prenom || !this.tableObj.contact || !this.tableObj.email) {
      this.message.error(this.translate.instant('veuillez.renseigner.les.champs.obligatoires'), {
        nzDuration: 5000
      })
      this.isLoadingBtn = false;
      return
    }

    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (this.tableObj.email) {
      if (emailRegex.test(this.tableObj.email)) {

      }else {
        this.message.error(this.translate.instant('veuillez.renseigner.un.mail.valide'), {
          nzDuration: 5000
        });
        this.isLoadingBtn = false;
        return
      }
    }

    if (this.modeApelle === 'ajout') {
      //   this.isLoadingOne = false;
      //  return;
      this.parentSvce.create(data)
        .subscribe(
          (response: any) => {
            console.log('responseee==>', response);
            if (response) {
              this.isLoadingBtn = false;
              this.message.success(this.translate.instant('ajouter.avec.succes'), {
                nzDuration: 5000
              });
              this.getParent()
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
      this.parentSvce.update(this.idParent, data)
        .subscribe(
          response => {
            //  console.log('responseee==>', response);
            if (response) {
              this.isLoadingBtn = false;
              this.message.success(this.translate.instant('modifier.avec.succes'), {
                nzDuration: 5000
              });
              this.getParent()
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

  retourPage() {
    this.router.navigate(['/private'], {skipLocationChange: true});
  }

  AddJoutParent() {
    this.modeApelle = 'ajout'
    this.isVisible = true
    this.titre = 'ajouter.parent';
  }

  getParent() {
    this.loading = true
    this.parentSvce.get()
      .subscribe(
        data => {
          this.parentData = data;
          this.loading = false
          // console.log('jour==>', data);
        },
        error => {
          this.loading = false
          console.log(error);
        });
  }
}
