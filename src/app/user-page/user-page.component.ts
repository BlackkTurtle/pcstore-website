import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: any;

  constructor(
    private titleService: Title,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private cookieService: CookieService
  ) {
    titleService.setTitle("Pc Store:User Page")
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe({
      next: () => console.log('User is authenticated'),
      error: () => this.router.navigate(['/authpage'])
    });

    this.authService.getUser().subscribe((result) => {
      this.user = result;
    });

    this.orderService.getOrdersByUser().subscribe((result) => {
    });
  }

  exitUser() {
    this.authService.logout().subscribe({
      next: () => console.log('User logged out'),
      error: () => console.log('Failed to log out')
    });
    this.router.navigate(['/']);
  }
}
