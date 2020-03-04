import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductForm } from '@shared/forms/products';
import { ProductsService } from '@shared/services/products.service';
import { CategoriesService } from '@shared/services/categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(new ProductForm);
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

}
