import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatiereService} from "../../../services/matiere.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";
import {ClasseService} from "../../../services/classe.service";
import {MatiereClasseService} from "../../../services/matiere.classe.service";

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
  isVisible = false;
  matiereData: any = [];
  loading = false;
  idMatiere: any;
  loadingClasse = false;
  classeValue: any;
  dataClasse: any = [];
  searchInput: any;
  matieresClasseData: any = [];
  titre: string = 'ajout.de.matiere';
  tableObj: any = {};
  isLoadingBtn = false;
  modeApelle: any;
  isVisibleMatiereClasse = false;
  titreMC: string = '';
  matieresClasseDataTemp: any = [];
  tabIndexvalue: any;
  idClasse: any;
  showMatierClasse = false;
  titreMatierClasse: any;
  libClasse: any;
  matierClasseArray: any = [];

  constructor(private router: Router,
              private matiereSvce: MatiereService,
              private message: NzMessageService,
              private translate: TranslateService,
              private classeSvce: ClasseService,
              private matiereClasseSvce: MatiereClasseService
  ) { }

  ngOnInit(): void {
    this.getMatiere()
    this.getClasse()
  }

  getMatiere() {
    this.loading = true
    this.matiereSvce.get()
      .subscribe(
        data => {
          this.matiereData = data;
          this.loading = false
          // console.log('jour==>', data);
        },
        error => {
          this.loading = false
          console.log(error);
        });
  }

  getMatiereByClasse(idClasse: any) {
    this.loading = true;
    this.matiereClasseSvce.getByClasse(idClasse, '').subscribe(
      (data:any) => {
        this.loading = false;
        //  console.log('dataaaa', data)
        this.matieresClasseData = data;
        this.matieresClasseDataTemp = this.matieresClasseData
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

  getClasse() {
    this.loading = true
    this.classeSvce.get()
      .subscribe(
        data => {
          this.dataClasse = data;
          this.loading = false
          // console.log('jour==>', data);
        },
        error => {
          this.loading = false
          console.log(error);
        });
  }

  retourPage() {
    this.router.navigate(['/private'], {skipLocationChange: true});
  }

  AddMatiere() {
    this.titre = 'ajout.de.matiere';
    this.modeApelle = 'ajout'
    this.isVisible = true
  }

  ModalModification(item: any) {
    this.isVisible = true
    this.modeApelle = 'modif'
    this.idMatiere = item.id
    this.tableObj = item
    this.titre = this.translate.instant('modifier.matier') + ' ' + item.libelle
  }

  getDeleteValue(item: any) {
    this.idMatiere = item.id
  }

  confirm() {
    this.matiereSvce.delete(this.idMatiere)
      .subscribe(
        response => {
          //   console.log('responseee==>', response);
          if (response) {
            this.message.success(this.translate.instant('supprimer.avec.succes'), {
              nzDuration: 5000
            });
            this.getMatiere();
          }
          //  this.submitted = true;
        },
        error => {
          console.log(error.error.message);
        });
  }

  cancel() {

  }

  AffecterMatiere() {
    this.titreMC = this.translate.instant('affecter.matiere') + ' ' + this.libClasse
    this.isVisibleMatiereClasse = true
  }

  selectClasse(event: any) {
    this.idClasse = event.id
    this.libClasse = event.libelle

    this.titreMatierClasse = this.translate.instant('liste.des.matieres.de.la.classe') + ' ' + event.libelle

    this.showMatierClasse = true

    this.getMatiereByClasse(this.idClasse)
  }

  search() {

  }

  handleCancel() {
    this.tableObj = {}
    this.isVisible = false
  }


  submitMatiere() {
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

      let count = this.matiereData?.filter((element: { code: any; }) => element.code == this.tableObj.code).length
      if (count) {
        this.message.error(this.translate.instant('ce.code.existe.deja'), {
          nzDuration: 5000
        });
        this.isLoadingBtn = false;
        return
      }

      //   this.isLoadingOne = false;
      //  return;
      this.matiereSvce.create(data)
        .subscribe(
          (response: any) => {
            console.log('responseee==>', response);
            if (response) {
              this.isLoadingBtn = false;
              this.message.success(this.translate.instant('ajouter.avec.succes'), {
                nzDuration: 5000
              });
              this.getMatiere()
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
      this.matiereSvce.update(this.idMatiere, data)
        .subscribe(
          response => {
            //  console.log('responseee==>', response);
            if (response) {
              this.isLoadingBtn = false;
              this.message.success(this.translate.instant('modifier.avec.succes'), {
                nzDuration: 5000
              });
              this.getMatiere()
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

  handleCancelMC() {
    this.isVisibleMatiereClasse = false
  }

  submitMatiereClasse() {
    this.isLoadingBtn = true
    if (this.matierClasseArray.length === 0) {
      this.message.error(this.translate.instant('veuillez.selectionner.une.matiere'), {
        nzDuration: 5000
      });
      this.isLoadingBtn = false
      return
    }

    //Verifier si les menus sélectionné existe deja

    for (let i =0; i < this.matierClasseArray.length; i++) {
      const el = this.matierClasseArray[i]
      let isExist = false
      this.matieresClasseDataTemp?.forEach((sh: { code: any; }) => {
        if(el.code == sh.code) isExist = true
      })

      if(isExist) {
        //message d'errur

        this.message.error(this.translate.instant('veuillez.decocher.les.matieres.deja.attribues'), {
          nzDuration: 5000
        });
        this.isLoadingBtn = false
        return;
      }
    }

    //  return;
    this.matiereClasseSvce.create(this.matierClasseArray)
      .subscribe(
        response => {
          // console.log('responseee==>', response);
          if (response) {
            this.message.success(this.translate.instant('ajouter.avec.succes'), {
              nzDuration: 5000
            });
            // this.getMenu()
            this.getMatiereByClasse(this.idClasse)
            this.isLoadingBtn = false;
            this.matierClasseArray = []
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

  selectMatiereAff(event: any, item: any) {
    if(event) {
      this.matierClasseArray.push({
        libelle: item.libelle,
        code: item.code,
        classesId: this.idClasse,
        path: item.path,
        ecolesId: '0'
      })
    } else {
      this.matierClasseArray.splice(event, 1);
      //  this.menuArray = this.menuArray.filter((el: any) => el.code != item.id)
    }
    //  console.log('event', event)
    // console.log(item.id)

    console.log(this.matierClasseArray)
  }

  searchClasse() {

  }

  selectedIndexChange(event: number) {
    this.tabIndexvalue = event
    // if (this.tabIndexvalue === 1) {
    //   this.getMatiereByClasse('1')
    // }
  }

  searchMatiere() {

  }

  retourListeClasse() {
    this.showMatierClasse = false
  }
}
