import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoriesService } from '@shared/services/categories.service';
import { CategoryForm } from '@shared/forms/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categoryForm: FormGroup;

  constructor(
    private service: CategoriesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group(new CategoryForm);
  }

  onSubmit() {
    if(this.categoryForm.invalid) {
      return
    }

    this.service.store(this.categoryForm.value)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }

}
