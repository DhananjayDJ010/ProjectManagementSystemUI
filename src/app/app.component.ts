import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import InitService from 'src/service/init.service';
import LogoutService from 'src/service/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'project-management-system';
  state!: any;
  showMenuBar = true;

  ngOnInit() {
    console.log('Warm up');
    this.init.projectHello().subscribe((response) => console.log(response.body));
    this.init.userHello().subscribe((response) => console.log(response.body));
    this.init.registerHello().subscribe((response) => console.log(response.body));
  }

  constructor(
    private router: Router,
    private logout: LogoutService,
    private init: InitService
  ) {
    this.router.events.subscribe((event) => {
      this.state = null;
      if (event instanceof NavigationEnd) {
        this.state = event.url;
        console.log(this.state);
        this.showMenuBar = this.state.includes('/hello') || this.state === '/';
      }
    });
  }

  logoutFunction() {
    this.logout.logOut();
  }
}
