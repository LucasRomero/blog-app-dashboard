import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  userEmail: string = '';
  isLoggedIn$: Observable<boolean> | undefined;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.userEmail = user.email;

      this.isLoggedIn$ = this.authService.isLoggedIn();
    }
  }

  onLogOut(): void {
    this.authService.logOut();
  }
}
