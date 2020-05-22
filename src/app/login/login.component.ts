import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';
import { first } from 'rxjs/operators';
import { Login } from '@shared/forms/login';
import * as M from 'materialize-css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public recoveryForm: FormGroup;
  recoveryPass = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if(this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
   }
  
  ngOnInit(): void {
    M.updateTextFields();
    this.loginForm = this.formBuilder.group(new Login);
    this.recoveryForm = this.formBuilder.group({
      user : new FormControl('', Validators.required)
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';    
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.user.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => this.router.navigate(['/']),
      error => {
        M.toast({ html:"Usuário ou senha incorretos", classes:"fail"})
        this.error = error;
        this.loading = false;
      }
    )
  }


  recovery = () => {
    this.authenticationService.createRecoveryPassord(this.recoveryForm.value)
      .subscribe(
        data => M.toast({ html: "Email enviado!"}),
        error => M.toast({ html: error, classes:'fail'}),
      )

  }

}
