import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


import { StreetartzProvider } from '../providers/streetart-database/streetart-database';


import { MyApp } from './app.component';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CategoryPage } from '../pages/category/category';
import { ProfilePage } from '../pages/profile/profile';
import { UploadImagePage } from '../pages/upload-image/upload-image';
import { ViewPage } from '../pages/view/view';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { PopOverProfilePage } from '../pages/pop-over-profile/pop-over-profile';
import { EmailComposer } from '@ionic-native/email-composer';
import firebase from 'firebase';
import { ForgotPasswordPage } from'../pages/forgot-password/forgot-password'
import { EulaPage } from '../pages/eula/eula';
import { Camera } from '@ionic-native/camera';
import { ChatsPage } from '../pages/chats/chats';
import { OrderModalPage } from '../pages/order-modal/order-modal';
import { ViewInforPage } from '../pages/view-infor/view-infor';


firebase.initializeApp({
 apiKey: "AIzaSyBJn72d9p4tVhdWkWsmecmKF4QjTHRXIj0",
 authDomain: "streetartsdatabase.firebaseapp.com",
 databaseURL: "https://streetartsdatabase.firebaseio.com",
 projectId: "streetartsdatabase",
 storageBucket: "streetartsdatabase.appspot.com",
 messagingSenderId: "202504182684"
})

@NgModule({
 declarations: [
   MyApp,
   SplashPage,
   LoginPage,
   SignupPage,
   CategoryPage,
   ProfilePage,
   UploadImagePage,
   ViewPage,
   EditProfilePage,
   PopOverProfilePage,
   ForgotPasswordPage,
   EulaPage,
   ChatsPage,
   OrderModalPage,
   ViewInforPage


   


 ],
 imports: [
   BrowserModule, HttpClientModule ,
   IonicModule.forRoot(MyApp),
   IonicImageViewerModule
 ],
 bootstrap: [IonicApp],
 entryComponents: [
   MyApp,
   SplashPage,
   LoginPage,
   SignupPage,
   CategoryPage,
   ProfilePage,
   UploadImagePage,
   ViewPage,
   EditProfilePage,
   PopOverProfilePage,
   ForgotPasswordPage,
   EulaPage,
   ChatsPage,
   OrderModalPage,
   ViewInforPage


 ],
 providers: [
   StatusBar,
   SplashScreen,
   EmailComposer,
   Camera,
   {provide: ErrorHandler, useClass: IonicErrorHandler},
   StreetartzProvider,EmailComposer,Camera
 ]
})
export class AppModule {}