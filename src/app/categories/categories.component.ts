import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoriesService } from '@shared/services/categories.service';
import { CategoryForm } from '@shared/forms/categories';
import * as M from 'materialize-css';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
  @ViewChild('name') nameField: ElementRef;

  public categoryForm: FormGroup;
  public categoriesInfos;
  public category;
  public loading: boolean = false;

  constructor(
    private service: CategoriesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group(new CategoryForm);
    this.route.queryParams
    .subscribe(({page}) => this.getCategories(page));
  }

  selectCategory = (category) => {
    this.nameField.nativeElement.focus();
    this.category = category;
    this.fillForm();
  }

  fillForm = () => this.categoryForm.patchValue(this.category);

  emptyForm = () => {
    this.category = null;
  }

  onSubmit() {
    this.loading = true;
    if(this.categoryForm.invalid) {
      return
    }

    if(this.category) {
      this.service.update(this.categoryForm.value)
      .subscribe(
        (response:any) => {
          M.toast({html: response?.message, classes:'succes'}); 
          this.getCategories();
          this.emptyForm();
        },
        error => M.toast({html: error, classes:'fail'}),
        () => this.loading = false
      );
      return;
    }

    this.service.store(this.categoryForm.value)
    .subscribe(
      (data:any) => {  
        M.toast({html: data?.message, classes:'succes'}); 
        this.getCategories()
      },
      error => M.toast({html: error, classes:'fail'}),
      () => this.loading = false
      
    )
  }

  getCategories = (page = 1) => this.service.get(page)
  .subscribe(
    response => this.categoriesInfos = response,
    error => M.toast({html: error, classes:'fail'})
  );

  deleteCategory = (category) => this.service.delete(category)
    .subscribe(
      data => {
        M.toast({ html:'Deletado com sucesso', classes:'succes' });
        this.getCategories();
      },
      error => M.toast({ html:'Erro ao deletar', classes:'fail' })
    )

  get pagination() {
    return [...Array( this.categoriesInfos?.last_page ).keys()];
  }

}
