import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<any>;
  email: string = 'ravi.rr2015rs@gmail.com';
  password: string = 'test12345';

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
      } else {
        return [];
      }
    })
  );
  }

  
  signUpWithEmail() {
    const role = 'User';
    // e.preventDefault()
    console.log('called')
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password).then((credentials) => {
      console.log(credentials)
      this.SendVerificationMail();
      const user = credentials.user;
      // this.router.navigate(['verify-account']);
      this.router.navigate(['']);
      return this.updateUserData(user, { role });
    })
  }
  signInWithEmail(email: string, password: string) {
    // e.preventDefault()
    console.log('called')
    this.afAuth.signInWithEmailAndPassword(this.email, this.password).then((credentials: any) => {
      console.log(credentials)
      if(credentials.user.emailVerified) {
        // navigate to dashboard
        sessionStorage.setItem('credentials', JSON.stringify(credentials));
        console.log('verified')
        this.router.navigate([''])
      } else {
        // verify email
      }
      console.log(credentials)
    })
  }
  SendVerificationMail() {
    return this.afAuth.currentUser.then((u: any) => u.sendEmailVerification()).then(() => {
        // this.router.navigate(['verify-email-address']);
      });
  }

  forgotPassword(passwordResetEmail: string) {
      return this.afAuth.sendPasswordResetEmail(this.email).then(() => {
         window.alert('Password reset email sent, check your inbox.');
        })
    .catch((error) => {
    window.alert(error);
    });
  }

  logout() {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
        sessionStorage.clear();
      })
      .catch((error) => {
        console.error('Logout Error:', error);
        throw error;
      });
  }

  private updateUserData(user: any, additionalData: any) {
    const userRef = this.afs.doc(`users/${user.uid}`);
    return userRef.set({ uid: user.uid, email: user.email, ...additionalData }, { merge: true });
  }

  isLoggedIn() {
    return sessionStorage.getItem('credentials');
  }

}
