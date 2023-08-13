import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TypeUserService} from "../../../services/type.user.service";

interface DataItem {
  code: string;
  nom: any;
}

@Component({
  selector: 'app-type-user',
  templateUrl: './type-user.component.html',
  styleUrls: ['./type-user.component.css']
})
export class TypeUserComponent implements OnInit {
  orderColumn = [
    {
      width:'10%',
      title: 'code',
      compare: (a: DataItem, b: DataItem) => a.code.localeCompare(b.code)
    },
    {
      title: 'nom',
      compare: (a: DataItem, b: DataItem) => a.nom.localeCompare(b.nom)
    },

    {
      width:'12%',
      title: ''
    }
  ];
  typeUserData: any = [];
  loading = false;

  constructor(private router: Router, private typeUserSvce: TypeUserService) { }

  ngOnInit(): void {
    this.getListeTypeuser()
  }

  AddJouTypeUser() {

  }

  getListeTypeuser(): void {
    this.loading = true
    this.typeUserSvce.get()
      .subscribe(
        data => {
          this.typeUserData = data;
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

  ModalModification(item: any) {

  }

  getDeleteValue(item: any) {

  }

  confirm() {

  }

  cancel() {

  }

  ModalHabilitation(item: any) {

    const myQueryParams = [
      {idType: item.id},
      {libelle: item.libelle},
    ];

    this.router.navigate(['private/habilitations'],
      { queryParams: { filter: JSON.stringify(myQueryParams)}, skipLocationChange: true}
    );
  }
}
