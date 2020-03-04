import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';
import { first } from 'rxjs/operators';
import { Login } from '@shared/forms/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group(new Login);
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
      data => this.router.navigate(['/products']),
      error => {
        console.log(error);
        this.error = error;
        this.loading = false;
      }
    )
  }

}
