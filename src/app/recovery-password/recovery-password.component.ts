import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Recovery } from '@shared/forms/recovery';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  public recoveryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: AuthenticationService
    ) { }

  ngOnInit(): void {
    M.updateTextFields();
    this.recoveryForm = this.formBuilder.group(new Recovery);
    this.route.queryParams.subscribe(({token}) => {
      this.service.findToken(token)
        .subscribe(
          data => this.recoveryForm.patchValue(data),
          error => M.toast({html:error, classes:'fail'})
        );

    })
    
  }

  onSubmit() {
    this.service.recoveryPassword(this.recoveryForm.value)
      .subscribe(
        data => M.toast({html:'Senha alterada com sucesso'}),
        error => M.toast({html: error, classes:'fail'})
      )
  }

}
