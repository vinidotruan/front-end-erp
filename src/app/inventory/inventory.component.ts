import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@shared/services/products.service';
import { Product } from '@shared/models/product';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '@shared/services/sales.service';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  loading: boolean = false;
  productsInfos;
  loggedUser;
  selectedProduct: Product;
  amount: number;

  screenType: string = "";
  
  constructor(
    private service: ProductsService,
    private salesService: SalesService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authenticationService.currentUserValue;    
    this.screenType = this.route.snapshot.data.type;
    console.log(this.route.snapshot.data.type);
    this.route.queryParams
    .subscribe(
      ({page}) => this.getProducts(page), 
      (error) => M.toast({html:error, classes: 'fail'})
    );

    this.initializeModal();
  }

  getProducts = (page?) => this.service.get(page)
  .subscribe(
    data => this.productsInfos = data,
    error => M.toast({html: error, classes:'fail'})
  )

  selectProduct = (product) => this.selectedProduct = product;

  get pagination() {
    return [...Array(this.productsInfos?.last_page).keys()];
  }

  
  initializeModal = () => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
    });
  }

  sell = () => this.salesService.store({ user_id: this.loggedUser.id, product_id: this.selectedProduct.id, amount:this.amount})
  .subscribe(
    data => {
      M.toast({html: 'Baixa cadastrada', classses:'success'});
      this.getProducts();
    }, error => M.toast({ html: error, classes: 'fail'})
  )
}
