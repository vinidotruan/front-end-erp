import { Component, OnInit } from '@angular/core';
import { SalesService } from '@shared/services/sales.service';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  salesInfos;
  
  constructor(
    private route: ActivatedRoute,
    private service: SalesService
  ) { }

  ngOnInit(): void {
    this.getSales();
    this.route.queryParams
      .subscribe(
        ({page}) => this.getSales(page),
        error => M.toast({ html:error, classes:'fail' })
      )
  }

  getSales = (page?) => this.service.get(page)
    .subscribe(
      data => this.salesInfos = data,
      error => M.toast({ html:error, classes:'fail' })
    )

    
  get pagination() {
    return [...Array(this.salesInfos?.last_page).keys()];
  }
}
