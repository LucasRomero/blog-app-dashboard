import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

import { FirebaseCodeErrorEnum } from '../enums/firebase-code-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afAuth = inject(AngularFireAuth);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  constructor() {}

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Logged In Successfully');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log('', error);
        this.toastr.info(this.getCodeError(error.code), 'Informacion', {
          closeButton: true,
        });
      });
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
