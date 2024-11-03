import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = !!this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    }

}
