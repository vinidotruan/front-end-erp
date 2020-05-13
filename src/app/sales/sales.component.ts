import { Component, OnInit } from '@angular/core';
import { SalesService } from '@shared/services/sales.service';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { PaginationHelper } from '@shared/helpers/pagination';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  salesInfos:Pagination;
  page;

  constructor(
    private route: ActivatedRoute,
    private service: SalesService,
    private paginationHelper: PaginationHelper
  ) { }

  ngOnInit(): void {
    this.getSales();
    this.route.queryParams
      .subscribe(
        ({page}) => this.getSales(page),
        error => M.toast({ html:error, classes:'fail' })
      )

  }

  getSales = (page?) => {
    this.page = page;
    this.service.get(page)
    .subscribe(
      data => this.salesInfos = data,
      error => M.toast({ html:error, classes:'fail' })
    );

  }
}
