import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { ReportObsoleteProduct } from '@shared/forms/reportObsoleteProduct';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reports-obsolete-products',
  templateUrl: './reports-obsolete-products.component.html',
  styleUrls: ['./reports-obsolete-products.component.scss']
})
export class ReportsObsoleteProductsComponent implements OnInit {

  reportForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    M.updateTextFields();
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {});

    this.reportForm = this.formBuilder.group(new ReportObsoleteProduct);
  }
}
