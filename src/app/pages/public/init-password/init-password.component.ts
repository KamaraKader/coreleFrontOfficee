import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init-password',
  templateUrl: './init-password.component.html',
  styleUrls: ['./init-password.component.css']
})
export class InitPasswordComponent implements OnInit {


  loading : boolean = false;
  initPasswordForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {

    this.initPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }


  // this.isLoad = true;
  // if(this.passwordForm.value.password !== this.passwordForm.value.confirmPassword){
  //   this.message.error(this.translate.instant('mot.de.pass.non.conforme'),
  //   { nzDuration: 5000 , });
  //   this.isLoad = false;
  //   return
  // }else{
  //   const data = {
  //     password: this.passwordForm.value.password
  //   }

  submitForm(){
    this.loading = true;
    if(this.initPasswordForm.value.password !== this.initPasswordForm.value.confirmPassword){
      this.message.error('mot.de.pass.non.conforme'),
      { nzDuration: 5000}
      this.loading = false;
      return
    }else{
      const data = {
        password: this.initPasswordForm.value.password
      }
      this.authService.initPassword(data).subscribe(
        (res)=>{
          if(res){
            console.log(res);
            this.message.success('Mot de passe initialiser avec succes'),
            { nzDuration: 5000 , };
            this.route.navigate(['/'])
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.message.error('error'),
          { nzDuration: 5000 , };
        }
      )
     
    }
  }


  annuler(){
    this.route.navigate(['/'])
  }

}
