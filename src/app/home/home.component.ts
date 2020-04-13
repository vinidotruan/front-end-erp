import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@shared/services/products.service';
import { SalesService } from '@shared/services/sales.service';
import { CategoriesService } from '@shared/services/categories.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoriesInfos;
  productsInfos;
  salesInfos;  

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private salesService: SalesService
  ) { }

  ngOnInit(): void {
    forkJoin(
      this.categoriesService.get(1),
      this.productsService.get(),
      this.salesService.get()
    ).subscribe(
      infos => {
        this.categoriesInfos = infos[0];
        this.productsInfos = infos[1];
        this.salesInfos = infos[2];
      }
    )
  }

}
