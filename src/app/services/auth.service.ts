import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

import { FirebaseCodeErrorEnum } from '../enums/firebase-code-error';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afAuth = inject(AngularFireAuth);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  private readonly loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {}

  login(email: string, password: string): void {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Logged In Successfully');
        this.loadUser();
        this.router.navigate(['/']);
        this.loggedIn.next(true);
      })
      .catch((error) => {
        console.log('', error);
        this.toastr.info(this.getCodeError(error.code), 'Informacion', {
          closeButton: true,
        });
      });
  }

  loadUser(): void {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('User Logged Out Succesfully');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCodeError(code: string) {
    switch (code) {
      // correo ya existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';

      // contraseña debil
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';

      // correo invalido
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo no valido';

      // password incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Correo electronico o contraseña incorrecta';

      // usuario no existe
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'Usuario no existente';
      default:
        return 'Error desconocido';
    }
  }
}
