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
  public selectedCategory;
  public loading: boolean = false;

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
    this.loading = true;
    if(this.productForm.invalid) {
      return;
    }
    this.service.store(this.productForm.value).subscribe(
      () => M.toast({html: "Cadastrado com sucesso", classes:'success'}),
      error => M.toast({html: error, classes:'fail'}),
      () => this.loading = false
    )
  }

  getCategories = () => this.categoriesService.get()
  .subscribe(
    (categories:any) => {this.categories = categories?.data; console.log(categories?.data)},
    error => M.toast({html: error, classes:'fail'})
  );

  setCategory = (category) => {
    this.productForm.controls['category_id'].setValue(this.getSelectedCategoryByName(category)?.id);
  }

  getSelectedCategoryByName(selectedName: string) {
    console.log(selectedName);
    return this.categories.find(categoriy => categoriy.name === selectedName);
  }

}
