import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProfesseurService} from "../../../services/professeur.service";

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

  constructor(private router: Router,
              private profSvce: ProfesseurService) { }

  ngOnInit(): void {
    this.getProf()
  }

  retourPage() {
    this.router.navigate(['/private'], {skipLocationChange: true});
  }

  AddJoutProf() {
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

  }

  getDeleteValue(item: any) {

  }

  confirm() {

  }

  cancel() {

  }

  handleCancel() {
    this.isVisible = false
  }

  submitProf() {

  }
}
