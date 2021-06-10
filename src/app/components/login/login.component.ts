import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authTypeList = ['login', 'register']
  authType = this.authTypeList[0];
  warningMessage: string;
  warningFlag = false;
  successMessage: string;
  successFlag = false;
  registerForm = this.fb.group({
      username: new FormControl('', [
        Validators.maxLength(10),
        Validators.minLength(4),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required
      ])
    }
  );

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onLoginSubmit(): void {
    const username = this.registerForm.get('username')!.value;
    const password = this.registerForm.get('password')!.value;
    this.authService.auth(username, password).pipe(take(1)).subscribe(tokenDto => {
      localStorage.setItem("token", tokenDto.token);
      localStorage.setItem("username", username)
      console.log('registration successful');
      console.log('token', tokenDto.token);
      this.router.navigate(['game-board']);
    }, error => {
      console.log("error during auth: ", error);
      switch (error.status) {
        case 403: {
          this.warningMessage = 'invalid login or password';
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
        case 401: {
          this.warningMessage = 'invalid login or password';
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
        case 500: {
          this.warningMessage = 'server error';
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
        default: {
          this.warningMessage = 'unexpected error';
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
      }
    })
  }

  onRegisterSubmit(): void {
    const username = this.registerForm.get('username')!.value;
    const password = this.registerForm.get('password')!.value;
    this.authService.register(username, password).pipe(take(1)).subscribe(tokenDto => {
      this.authType = this.authTypeList[0];
      console.log('registration successful');
      this.successMessage = 'registration successful';
      this.successFlag = true;
      setTimeout(() => this.successFlag = false, 5000);

    }, error => {
      console.log("error during auth: ", error);
      switch (error.status) {
        case 200: {
          this.authType = this.authTypeList[0];
          console.log('registration successful');
          this.successMessage = 'registration successful';
          this.successFlag = true;
          setTimeout(() => this.successFlag = false, 5000);
          break;
        }
        case 403: {
          this.warningMessage = 'invalid login or password';
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
        case 401: {
          this.warningMessage = 'invalid login or password';
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
        case 500: {
          this.warningMessage = 'server error';
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
        case 400: {
          this.warningMessage = error.error.message;
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
        default: {
          this.warningMessage = 'unexpected error';
          this.warningFlag = true;
          setTimeout(() => this.warningFlag = false, 3000);
          break;
        }
      }
    })
  }
}
