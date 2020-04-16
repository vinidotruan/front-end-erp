import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@shared/services/products.service';
import { SalesService } from '@shared/services/sales.service';
import { CategoriesService } from '@shared/services/categories.service';
import { forkJoin } from 'rxjs';
import { FeedsService } from '@shared/services/feeds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoriesInfos;
  productsInfos;
  salesInfos;
  feedsInfos;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private salesService: SalesService,
    private feedsService: FeedsService
  ) { }

  ngOnInit(): void {
    forkJoin(
      this.categoriesService.get(1),
      this.productsService.get(),
      this.salesService.get(),
      this.feedsService.get(),
    ).subscribe(
      infos => {
        this.categoriesInfos = infos[0];
        this.productsInfos = infos[1];
        this.salesInfos = infos[2];
        this.feedsInfos = infos[3];
      }
    )
  }

}
