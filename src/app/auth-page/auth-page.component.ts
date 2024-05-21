import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css', "../../assets/styles/authorizationCommon.css"]
})
export class AuthPageComponent {

  loginform:any;

  authorizeerror:boolean=false;
  errorMessage: string = '';

  constructor(private authService:AuthService,private router:Router){
    //loginform
    this.loginform=new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password:new FormControl('',[
        Validators.required
      ])
    });
  }
  //login form pass visibility
  togglePasswordVisibility(): void {
    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
    const toggleImg = document.getElementById('togglePassword') as HTMLImageElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleImg.src = '../../assets/images/togglepassword2.png';
    } else {
      passwordInput.type = 'password';
      toggleImg.src = '../../assets/images/togglepassword1.png';
    }
  }

  //pass match validator
createCompareValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
  return () => {
  if (controlOne.value !== controlTwo.value)
    return { match_error: 'Value does not match' };
  return null;
};
}

onLogin() {
  this.authService.logInUser(
    this.loginform.controls['email'].value,
    this.loginform.controls['password'].value
  ).subscribe(
    (res: any) => {
      if (res.error) {
        // Handle the error returned from the service
        this.authorizeerror = true;
        this.errorMessage = res.message;
      } else if (res.status === 401) {
        this.authorizeerror = true;
      } else {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/userpage']);
      }
    },
    (error) => {
      // Handle any additional errors
      this.errorMessage = error;
      console.error('There was an error during the login process:', error);
    }
  );
}
}
