import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);

  onSubmit(loginForm: any): void {
    console.log(loginForm);
    this.authService.login(loginForm.email, loginForm.password);
  }
}
