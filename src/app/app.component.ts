import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';


import firebase from 'firebase';
import 'firebase/firestore';

import { ProfilePage } from '../pages/profile/profile';

import { SplashPage } from '../pages/splash/splash';

import { CategoryPage } from '../pages/category/category';
import { ViewPage } from '../pages/view/view';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { viewParentEl } from '@angular/core/src/view/util';
import { StreetartzProvider } from '../providers/streetart-database/streetart-database';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any = CategoryPage  ;
   
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public art: StreetartzProvider) {
   
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
       
        console.log("UID: " + user.uid)
      } else {
        // No user is signed in.
        console.log("Nothing Found!")
        this.rootPage= LoginPage
      }
    })

   
    this.initializeApp();
    // used for an example of ngFor and navigation
    

 
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}