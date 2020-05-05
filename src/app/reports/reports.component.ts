import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { ReportObsoleteProduct } from '@shared/forms/reportObsoleteProduct';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportsService } from '@shared/services/reports.service';
import { AuthenticationService } from '@shared/services/authentication.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportObsoleteForm: FormGroup;
  reportInventoryDown: FormGroup;
  data;

  constructor(
    private formBuilder: FormBuilder,
    private service: ReportsService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    M.Tabs.init(document.querySelectorAll('.tabs'), {swipeable:true});
    M.updateTextFields();
    this.reportObsoleteForm = this.formBuilder.group(new ReportObsoleteProduct(this.authService?.currentUserValue?.id));
  }

  onSubmit() {  
    this.service.obsoleteProducts(this.reportObsoleteForm?.value)
      .subscribe(
        data => this.data = data,
        error => M.toast({ html:error, classes:'error' })
      )
  }
}
