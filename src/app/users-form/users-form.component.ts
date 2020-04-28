import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as M from 'materialize-css';
import { UserForm } from '@shared/forms/users';
import { RolesService } from '@shared/services/roles.service';
import { UserService } from '@shared/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  userForm: FormGroup;
  roles;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RolesService,
    private service: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    M.updateTextFields();
    this.getAllRoles();
    this.userForm = this.formBuilder.group(new UserForm);

    if(this.route.snapshot.paramMap.get('id')) {
      this.service.find(this.route.snapshot.paramMap.get('id'))
        .subscribe(
          data => {
            this.userForm.patchValue(data);
            M.updateTextFields();  
          },
          error => M.toast({ html:error, classes:'fail' })
        )
    }
    M.updateTextFields();
  }

  getAllRoles = () => {
    this.roleService.getAll()
      .subscribe(
        data => this.roles = data,
        error => M.toast({html:error, classes:'fail'})
      )
  }

  onSubmit() {
    if(this.userForm?.value?.id) {
      this.service.update(this.userForm?.value)
        .subscribe(
          data => M.toast({ html:'Atualizado com suceso', classes:'succes' }),
          error => M.toast({ html: error, classes:'fail' })
        )
    } else {
      this.service.store(this.userForm.value)
        .subscribe(
          data => M.toast({ html:'Criado com sucesso', classes:'succes' }),
          error => M.toast({ html:error, classes:'fail' })
        );
    }
  }

  clean = () => this.userForm.reset();

}
