import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProfesseurService} from "../../../services/professeur.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";
import {I_Professeur} from "../../../models/professeur";
import {Observable} from "rxjs";

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit {
  loading = false;
  profData: any = [];
  isVisible = false;
  titre:string  = 'ajout.un.professeur';
  isLoadingBtn = false;
  tableObj: any = {};
  modeApelle: any;
  idProf: any;

  prof: Observable<I_Professeur> | undefined;

  constructor(private router: Router,
              private profSvce: ProfesseurService,
              private message: NzMessageService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.getProf()
  }

  retourPage() {
    this.router.navigate(['/private'], {skipLocationChange: true});
  }

  AddJoutProf() {
    this.modeApelle = 'ajout'
    this.isVisible = true
  }

  getProf(): void {
    this.loading = true
    this.profSvce.get()
      .subscribe(
        data => {
          this.profData = data;
          this.loading = false
          // console.log('jour==>', data);
        },
        error => {
          this.loading = false
          console.log(error);
        });
  }

  ModalModification(item: any) {
    this.idProf = item.id
    this.tableObj = item
    this.modeApelle = 'modif'
    this.isVisible= true
    this.titre = this.translate.instant('modifier.professeur') + ' ' + item.nom + ' ' +  item.prenom
  }

  getDeleteValue(item: any) {
    this.idProf = item.id
  }

  confirm() {
    this.profSvce.delete(this.idProf)
      .subscribe(
        response => {
          //   console.log('responseee==>', response);
          if (response) {
            this.message.success(this.translate.instant('supprimer.avec.succes'), {
              nzDuration: 5000
            });
            this.getProf();
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

  submitProf() {
    const data: I_Professeur = {
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
      this.profSvce.create(data)
        .subscribe(
          (response: any) => {
            console.log('responseee==>', response);
            if (response) {
              this.isLoadingBtn = false;
              this.message.success(this.translate.instant('ajouter.avec.succes'), {
                nzDuration: 5000
              });
              this.getProf()
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
      this.profSvce.update(this.idProf, data)
        .subscribe(
          response => {
            //  console.log('responseee==>', response);
            if (response) {
              this.isLoadingBtn = false;
              this.message.success(this.translate.instant('modifier.avec.succes'), {
                nzDuration: 5000
              });
              this.getProf()
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
}
