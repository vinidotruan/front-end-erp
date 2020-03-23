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
  filter: string;
  filterType: string = "title";

  screenType: string = "";
  
  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private salesService: SalesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authenticationService.currentUserValue;    
    this.screenType = this.route.snapshot.data.type;
    this.route.queryParams
    .subscribe(
      ({page}) => (this.haveFilter()) ? this.search(this.service.filter): this.getProducts(page), 
      (error) => M.toast({html:error, classes: 'fail'})
    );
    M.updateTextFields();
    this.initializeModal();
    this.initializeSelect();
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
  
  initializeSelect = () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }

  sell = () => this.salesService.store({ user_id: this.loggedUser.id, product_id: this.selectedProduct.id, amount:this.amount})
  .subscribe(
    data => {
      M.toast({html: 'Baixa cadastrada', classses:'success'});
      this.getProducts();
    }, error => M.toast({ html: error, classes: 'fail'})
  )

  addAmount = () => this.service.update({ id: this.selectedProduct.id, amount:(this.amount+this.selectedProduct.amount) })
  .subscribe(
    data => {
      M.toast({html: 'Adicionado com sucesso', classses:'success'});
      this.getProducts();
    }, error => M.toast({ html: error, classes: 'fail'})
  )

  search = (filter?) => {this.service.search((filter??`${this.filterType}=${this.filter}`))
    .subscribe(
      products => this.productsInfos = products,
      error => M.toast({ html: error, classes:"fail"})
    ); console.log((filter??`${this.filterType}=${this.filter}`))}

  haveFilter = () => this.service.filter;
}
