import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '@shared/services/notifications.service';
import { AuthenticationService } from '@shared/services/authentication.service';

import * as M from 'materialize-css';
import { Router, Event, NavigationStart } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  notifications;
  show = false;
  clickOutCounter = 0;

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthenticationService,
    private router: Router

  ) { }

  ngOnInit(): void {
      
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.getNotifications();
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  showNotifications = () => this.show = true;

  hideNotifications = () => {
    
    if( this.clickOutCounter === 0 ) {
      this.sumClickOut();
    } else {
      this.show = false;
      this.clickOutCounter = 0;
    }
  }

  sumClickOut = () => this.clickOutCounter++;

  markAllAsRead = () => {
    this.notificationsService.marAsRead(this.authService.currentUserValue.id)
    .subscribe(
      () => this.getNotifications(),
      error => M.toast({html:"Erro ao buscar notificações", classes:"fail"})

    )
  }

  getNotifications = () => {
    this.notificationsService.get(this.authService.currentUserValue.id)
    .subscribe(
      data => {
        this.notifications = data;
        this.show = false;
      },
      error => M.toast({html:"Erro ao buscar notificações", classes:"fail"})
    )
  }

}
