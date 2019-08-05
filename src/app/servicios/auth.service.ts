import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { promise } from 'protractor';
import { resolve } from 'path';
import { reject } from 'q';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth, private router : Router, private bd : AngularFirestore) { }

  login(email : string, password : string){
    return new Promise((resolve, rejected) =>{
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user =>{
        resolve(user); 
      }).catch(err => rejected(err));
    });
  }

  logout(){
    this.AFauth.auth.signOut().then( () =>{
      this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string, nombre : string){
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
        
        const uid = res.user.uid;
        this.bd.collection('users').doc(res.user.uid).set({
          name : nombre,
          uid : uid
        })

        resolve(res);
      }).catch( err => reject(err));
    })
  }
}
