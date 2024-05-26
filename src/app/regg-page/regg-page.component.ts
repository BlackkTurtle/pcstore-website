import { Component } from '@angular/core';
import {FormGroup,FormControl,NgForm, Validators,AbstractControl,ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-regg-page',
  templateUrl: './regg-page.component.html',
  styleUrls: ['./regg-page.component.css', "../../assets/styles/authorizationCommon.css"]
})
export class ReggPageComponent {
  reggform:any;

  errorMessage:string="";

  constructor(private authService:AuthService,private router:Router){
    //reg form
    this.reggform=new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      phone:new FormControl('',[
        Validators.required,
        Validators.pattern(/^(\+380|0)\d{9}$/)
      ]),
      passwordreg:new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
        )
      ]),
      passwordrepeat:new FormControl('',[
        Validators.required,
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
      ]),
      surname:new FormControl('',[
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ]),
      firstname:new FormControl('',[
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ]),
      father:new FormControl('',[
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ])
    });
  }

  //reg form pass visibility
  toggleregPasswordVisibility(): void {
    const passwordInput = document.querySelector('input[name="passwordreg"]') as HTMLInputElement;
    const toggleImg = document.getElementById('toggleregPassword') as HTMLImageElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleImg.src = '../../assets/images/togglepassword2.png';
    } else {
      passwordInput.type = 'password';
      toggleImg.src = '../../assets/images/togglepassword1.png';
    }
  }
  //reg form passrepeat visibility
  toggleregPasswordrepeatVisibility(): void {
    const passwordInput = document.querySelector('input[name="passwordrepeat"]') as HTMLInputElement;
    const toggleImg = document.getElementById('toggleregrepeatPassword') as HTMLImageElement;

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

onRegister() {
  if (this.reggform.invalid) {
    this.errorMessage = 'Please fill in all fields correctly.';
    return;
  }

  this.authService.registerUser(
    this.reggform.controls['email'].value,
    this.reggform.controls['firstname'].value,
    this.reggform.controls['surname'].value,
    this.reggform.controls['father'].value,
    this.reggform.controls['phone'].value,
    this.reggform.controls['passwordreg'].value,
    this.reggform.controls['passwordrepeat'].value
  ).subscribe(
    (res: any) => {
      if (res.error) {
        this.errorMessage = "Користувач з такою поштою вже існує у базі!";
      } else {
        this.router.navigate(['/authpage']);
      }
    },
    (error) => {
      this.errorMessage = 'An error occurred during the registration process. Please try again later.';
      console.error('There was an error during the registration process:', error);
    }
  );
}
}
