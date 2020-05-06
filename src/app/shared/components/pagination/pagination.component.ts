import { Component, OnInit, Input } from '@angular/core';
import { Pagination } from '@shared/models/pagination';
import { PaginationHelper } from '@shared/helpers/pagination';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() arrayInfos: Pagination;
  @Input() moduleUrl: string;
  @Input() page: number;
  @Input() filter: string;

  constructor(
    private paginationHelper: PaginationHelper,
  ) { }

  ngOnInit(): void {
    if(!this.page) {
      this.page = 1;
    }
  }

      
  get pagination() {
    const paginationNumbers = [...Array(this.arrayInfos?.last_page).keys()];
    const actual = this.paginationHelper.getActual(paginationNumbers, this.page);
    const pagination = this.paginationHelper.getPagination(paginationNumbers, actual);
    return (pagination != -1) ? pagination : [];
  }


}
