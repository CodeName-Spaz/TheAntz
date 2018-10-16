import { Component } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { StreetartzProvider } from '../providers/streetart-database/streetart-database';

import firebase from 'firebase';
import { ProfilePage } from '../pages/profile/profile';
import { SplashPage } from '../pages/splash/splash';
import { CategoryPage } from '../pages/category/category';
import { ViewPage } from '../pages/view/view';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { viewParentEl } from '@angular/core/src/view/util';

import { UploadImagePage } from '../pages/upload-image/upload-image';


@Component({
 templateUrl: 'app.html'
})
export class MyApp {
 @ViewChild(Nav) nav: Nav;


 rootPage: any ;;

 pages: Array<{title: string, component: any}>;

 constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public art: StreetartzProvider) {
   art.checkstate().then((data:any)=>{
     if (data ==1){
       this.rootPage = CategoryPage;
     }
     else {
       this.rootPage = SplashPage
     }
    })
   this.initializeApp();
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