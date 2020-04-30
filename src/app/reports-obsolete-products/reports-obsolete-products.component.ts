import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { ReportObsoleteProduct } from '@shared/forms/reportObsoleteProduct';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportsObsoleteProductsService } from '@shared/services/reports-obsolete-products.service';
import { AuthenticationService } from '@shared/services/authentication.service';
@Component({
  selector: 'app-reports-obsolete-products',
  templateUrl: './reports-obsolete-products.component.html',
  styleUrls: ['./reports-obsolete-products.component.scss']
})
export class ReportsObsoleteProductsComponent implements OnInit {

  reportForm: FormGroup;
  data;

  constructor(
    private formBuilder: FormBuilder,
    private service: ReportsObsoleteProductsService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    M.updateTextFields();
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {});

    this.reportForm = this.formBuilder.group(new ReportObsoleteProduct(this.authService?.currentUserValue?.id));
  }

  onSubmit() {
    this.service.post(this.reportForm?.value)
      .subscribe(
        data => this.data = data,
        error => M.toast({ html:error, classes:'error' })
      )
  }
}
