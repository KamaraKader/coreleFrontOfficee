import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'console';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  
  loading: boolean = false;
  resetPasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService,
    private translate: TranslateService,

  ) { }

  ngOnInit(): void {
 
    this.resetPasswordForm = this.fb.group({
      email:['', Validators.required],
     
    })
  }


  annuler(){
    this.router.navigate(['/'])
  }

  submitForm(){
   // console.log(this.resetPasswordForm.value);
    this.loading = true;
    this.authService.forgotPassword(this.resetPasswordForm.value).subscribe(
      (res) => {
        this.loading = false;
        console.log(res);
        if(res){
          this.message.success(this.translate.instant('un.mail.est.envoyer.à.votre.adresse')),
          { nzDuration: 5000 , };
          this.router.navigate(['/public/confirm-password'], {skipLocationChange: true})
        }
        
      },
      (error) => {
       // console.log('erreur de mot de passe oublier',error);
        this.loading = false;
        this.message.error(error.error.message, {
          nzDuration: 5000
        });
        // this.message.error(err.HttpErrorResponse.error.message),
        // { nzDuration: 5000 , };
      }
    )
   
  
  }




}
