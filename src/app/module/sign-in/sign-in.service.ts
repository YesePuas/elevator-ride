import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { User } from 'src/app/core/interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  userDate: any;

  constructor(
    private router: Router,
    private AngularFireAuth: AngularFireAuth,
    private AngularFirestore: AngularFirestore
  ) {}

  SignIn(user: User) {
    return this.AngularFireAuth.signInWithEmailAndPassword(
      user.email!,
      user.password!
    )
      .then((result) => {
        this.SetUserData(result.user, user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserData(user: any, data: any) {
    console.log('llega esto User', user);
    const userRef: AngularFirestoreDocument<any> = this.AngularFirestore.doc(
      `users/${user.id}`
    );
    const userData: User = {
      id: data.id,
      nombre: data.nombre,
      cedula: data.cedula,
      telefono: data.telefono,
      direccion: data.direccion,
      rol: data.rol,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
