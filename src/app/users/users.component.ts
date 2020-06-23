import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import * as M from 'materialize-css';
import { ErrorInterceptor } from '@shared/helpers/error.interceptor';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersInfos;
  authUser;

  constructor(
    private service: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authUser = this.authService.currentUserValue;
    this.getUsers();
  }

  getUsers = () => this.service.getAll()
    .subscribe(
      data => this.usersInfos = data,
      error => M.toast({ html:error, classes:'fail' })
    )

  delete = (user) => {
    this.service.delete(user?.id)
      .subscribe(
        data => this.getUsers(),
        error => M.toast({ html:error, classes:'fail' })
      )
  }

}
