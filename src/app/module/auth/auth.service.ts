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
export class AuthService {
  userDate: any;

  constructor(
    private router: Router,
    private AngularFireAuth: AngularFireAuth,
    private AngularFirestore: AngularFirestore
  ) {}

  /* public getAuth() {
    this.AngularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userDate = user;
        console.log('loginnn', this.userDate);
        localStorage.setItem('user', JSON.stringify(this.userDate));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  } */

  /*   get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  } */

  // Sign out
  /*   SignOut() {
    return this.AngularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    });
  } */
}
