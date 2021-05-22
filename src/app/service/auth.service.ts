import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc('users/' + user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await firebase.auth().signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await firebase.auth().signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({uid, email, displayName, photoURL}) {
    const userRef: AngularFirestoreDocument = this.afs.doc('users/' + uid);
    const data = {
      uid,
      email,
      displayName,
      photoURL
    };
    this.router.navigate(['/']);

    return userRef.set(data, {merge: true});

  }
}
