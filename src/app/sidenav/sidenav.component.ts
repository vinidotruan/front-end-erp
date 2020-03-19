import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import * as M from 'materialize-css';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private authService: AuthenticationService

  ) { }

  ngOnInit(): void {
  }

  logout = () =>{
    this.authService.logout()
      .subscribe(
        () => location.reload(true),
        error => M.toast({html: error, classes: 'fail'})
      );
  }
}
