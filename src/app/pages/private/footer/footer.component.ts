import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentDate!: string;

  constructor() { }

  

  ngOnInit(): void {
    this.getCurrentdate()
  }


  getCurrentdate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
    this.currentDate = `${day}/${month}/${year}`;
   //   console.log(this.currentDate); // "17-6-20
  }


}
