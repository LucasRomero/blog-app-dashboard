import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  userEmail: string = '';

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user')!).email;
  }

  onLogOut(): void {
    this.authService.logOut();
  }
}
