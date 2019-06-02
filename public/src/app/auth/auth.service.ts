import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async  loginWithGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  async  loginWithFacebook() {
    await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
  }
}
