import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder, private router: Router, private authService: AuthService,private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
  });
  }


  forgotPassword(){
    this.router.navigate(['mot-de-passe-oublie'], {skipLocationChange: true});
  }


/*  submitForm(): void {
   // console.log(this.loginForm.value)
   this.loading = true
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (data) => {
        this.loading = false
         console.log(data)
         this.router.navigate(['/private'], {skipLocationChange: true});
      },
       (error) => {
         console.log(error)
         this.loading = false
         setTimeout(() => {
           this.modal.error({
             nzTitle: 'Error',
             nzContent: 'Username or password is incorrect'
           });
         }, 1000);
     }
    )
 }*/
  submitForm() {
    this.router.navigate(['/private'], {skipLocationChange: true});
  }
}
