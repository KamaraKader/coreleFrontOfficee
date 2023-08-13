import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {


  confirmPasswrod!:  FormGroup;
  loading : boolean = false;
  token:any
  tokenValue: any

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
   this.activatedRoute.queryParams.subscribe(
      param =>{
      //  console.log(param);
        
       this.token = param['token']
      // console.log('000',this.token);
       if ( this.token &&  this.token != 'null') {
        // console.log(decodedValue, '<---decoded');
         
        //  localStorage.setItem('JWT_NAME', decodedValue);
        localStorage.setItem('confirmToken', this.token)
        this.router.navigate(['public/confirm-password'])
       }
      
      //  //console.log('toek', this.token );
       
      }
    )

     this.tokenValue = localStorage.getItem('confirmToken')
    //   console.log('toeken recu apre redirection', this.token);
      

    this.confirmPasswrod = this.fb.group({
      password:['', Validators.required]
    })
  }

  


  
  annuler(){
    this.router.navigate(['/'])
  }

  submitForm(){
   // console.log(this.tokenValue);
    
    const data = {
      token: this.tokenValue,
      password: this.confirmPasswrod.value.password
    }

     this.loading = true
   
    this.authService.setPassword(data).subscribe(
      (res)=> {
        this.loading = false
        console.log(res);
        this.message.success('modifier.avec.succes'),
        { nzDuration: 5000 , };
          this.router.navigate(['/'])
      }, 
      (err)=> {
        console.log();
        this.loading = false
        this.message.error('une erreur s\'est produite'),
        { nzDuration: 5000}
      }
    )
    
  }

}
