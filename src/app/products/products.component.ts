import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductForm } from '@shared/forms/products';
import { ProductsService } from '@shared/services/products.service';
import { CategoriesService } from '@shared/services/categories.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productForm: FormGroup;
  public categories;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(new ProductForm);
    this.getCategories();
  }

  onSubmit() {
    if(this.productForm.invalid) {
      return;
    }

    this.service.store(this.productForm.value).subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }

  getCategories = () => this.categoriesService.get()
  .subscribe(
    (categories:any) => {this.categories = categories?.data; console.log(categories?.data)},
    error => M.toast({html: error, classes:'fail'})
  );

}
