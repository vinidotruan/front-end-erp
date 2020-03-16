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
            this.setCategory(product.category.name);
            this.selectedCategory = product.category;
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
    this.service.store(this.productForm.value).subscribe(
      () => M.toast({html: "Cadastrado com sucesso", classes:'success'}),
      error => M.toast({html: error, classes:'fail'}),
      () => this.loading = false
    )
  }

  getCategories = () => this.categoriesService.get()
  .subscribe(
    (categories:any) => {
      this.categories = categories?.data;
      var elems = document.querySelectorAll('.autocomplete');
      var instances = M.Autocomplete.init(elems, {
        data: this.mountCategoriesObj(categories?.data), 
        onAutocomplete: (category_name) => this.setCategory(category_name),
      }, {count:43});
      instances[0].activeIndex = 3;
      instances[0].isOpen = true;
      console.log(instances);
    },
    error => M.toast({html: error, classes:'fail'})
    );

    mountCategoriesObj = (categories) => Object.keys(categories)
      .map( (d, i) => [categories[d].name, null])
      .reduce( (ac, d, i) => (ac[d[0]] = d[1], ac), {} );

  setCategory = (category_name) => {
    console.log(this.aa);
    this.productForm.controls['category_id'].setValue(this.getSelectedCategoryByName(category_name)?.id);
  }

  getSelectedCategoryByName(selectedName: string) {
    return this.categories.find(category => category.name === selectedName);
  }
}
