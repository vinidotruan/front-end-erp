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
  page;

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

  getSales = (page?) => {
    this.page = page;
    this.service.get(page)
    .subscribe(
      data => this.salesInfos = data,
      error => M.toast({ html:error, classes:'fail' })
    );
  }

    
  get pagination() {
    const paginationInfo = [...Array(this.salesInfos?.last_page).keys()];
    const actual = paginationInfo.findIndex(pagination => pagination == this.page);
    const limiter = actual+4;
    let pages = [];
    pages.push(actual-1);

    for (let i = actual; i < limiter; i++) {
      pages.push(i);
    }
    console.log(pages);
    return pages;
  }
}
