import { Component } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';


import firebase from 'firebase';
import { ProfilePage } from '../pages/profile/profile';
import { SplashPage } from '../pages/splash/splash';
import { CategoryPage } from '../pages/category/category';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ProfilePage
  ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation


    firebase.initializeApp({
      apiKey: "AIzaSyDXJsbuaNORuwbz2gdRBFi-kUQ1JDJKoMA",
        authDomain: "street-artz-181f2.firebaseapp.com",
        databaseURL: "https://street-artz-181f2.firebaseio.com",
        projectId: "street-artz-181f2",
        storageBucket: "street-artz-181f2.appspot.com",
        messagingSenderId: "118526884863"
    })

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

