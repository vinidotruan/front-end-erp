import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ReportsService } from '@shared/services/reports.service';
import { AuthenticationService } from '@shared/services/authentication.service';
import { ReportObsoleteProduct } from '@shared/forms/reportObsoleteProduct';
import { environment } from "@environment/environment"

import * as M from 'materialize-css';
import { Product } from '@shared/models/product';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportObsoleteForm: FormGroup;
  reportInventoryDown:Product[];
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
    this.getInventoryDownProducts();
  }

  onSubmit() {  
    this.service.obsoleteProducts(this.reportObsoleteForm?.value)
      .subscribe(
        data => this.data = data,
        error => M.toast({ html:error, classes:'error' })
      )
  }

  getInventoryDownProducts = () => {
    this.service.inventoryDownProducts()
      .subscribe(
        data => this.reportInventoryDown = data,
        error => M.toast({ html: 'Erro ao buscar os produtos', classes: 'fail'})
      )
  }

  getPdfInventoryDown = () => {
    window.open(environment.getInventoryDownUrl, "_blank");
  }
  
  downloadPdfInventoryDown = () => {
    window.open(environment.downloadInventoryDownUrl, "_blank");
  }
}
