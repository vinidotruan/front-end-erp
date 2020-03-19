import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductForm } from '@shared/forms/products';
import { ProductsService } from '@shared/services/products.service';
import { CategoriesService } from '@shared/services/categories.service';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productForm: FormGroup;
  public categories;
  public autocomplete;
  public aa;
  public selectedCategory;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(new ProductForm);
    this.getCategories();

    if(this.route.snapshot.paramMap.get('id')) {
      this.service.find(this.route.snapshot.paramMap.get('id'))
        .subscribe(
          (product) => {
            this.productForm.patchValue(product);
            M.updateTextFields();            
            M.textareaAutoResize(document.querySelector('.materialize-textarea'));
          },
          error => M.toast({ html: error, classes:'fail'})
        );
    }
  }

  onSubmit() {
    this.loading = true;
    if(this.productForm.invalid) {
      return;
    }

    if(this.productForm.value.id) {
      this.service.update(this.productForm.value)
      .subscribe(
        () => M.toast({html: "Atualizado com sucesso", classes:'success'}),
        error => M.toast({html: error, classes:'fail'}),
        () => this.loading = false
      )
    } else {
    this.service.store(this.productForm.value)
      .subscribe(
        () => M.toast({html: "Cadastrado com sucesso", classes:'success'}),
        error => M.toast({html: error, classes:'fail'}),
        () => this.loading = false
      )
    }
  }

  getCategories = () => this.categoriesService.get()
  .subscribe(
    (categories:any) =>  this.categories = categories?.data,
    error => M.toast({html: error, classes:'fail'})
    );
}
