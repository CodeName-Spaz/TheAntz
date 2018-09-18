import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { obj } from '../../app/class';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the StreetartzProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StreetartzProvider {
  obj = {} as obj;
  arr = [];
  category;
  keys = [];
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello StreetartzProvider Provider');

  }
logout() {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(()=>{
   resolve();
    } , (error)=>{
      reject(error)
    })
  })
}
  presentToast1() {
    const toast = this.toastCtrl.create({
      message: 'email or password doesnot match!',
      duration: 3000

    });
  }
  register(obj: obj) {
    return firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then((newUser) => {
      firebase.auth().signInWithEmailAndPassword(obj.email, obj.password).then((authenticatedUser) => {
        var user = firebase.auth().currentUser
        firebase.database().ref("profiles/" + user.uid).set(obj);
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          title: error.code,
          subTitle: error.message,
          buttons: [
            {
              text: 'ok',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
        console.log(error);
      })
    })
  }
  login(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        resolve();

      }).catch((error) => {
        const alert = this.alertCtrl.create({
          title: error.code,
          subTitle: error.message,
          buttons: [
            {
              text: 'ok',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
        console.log(error);
      })
    })
  }
  profile(obj: obj) {
    return new Promise((pass, fail) => {
      let userID = firebase.auth().currentUser;
      firebase.database().ref("profiles/" + userID.uid).on('value', (data: any) => {
        let username = data.val();
        this.arr.push(username);
        console.log(this.arr);
      });
      pass(this.arr);
    })

  }
  forgotpassword(email) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email);
      resolve();
    })
  }
  uploadPic(pic, name) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });

    const toast = this.toastCtrl.create({
      message: 'Ur image has been added!',
      duration: 3000
    });
    return new Promise((accpt, rejc) => {
      loading.present();
      firebase.storage().ref(name).putString(pic, 'data_url').then(() => {
        accpt(name);
        toast.present();
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  storeToDB(name, category, picName){
    return new Promise((accpt,rejc) =>{
      var storageRef = firebase.storage().ref(name);
      storageRef.getDownloadURL().then(url => {
        console.log(url)
        var user = firebase.auth().currentUser;
        var link =  url;
        firebase.database().ref('uploads/').push({
              downloadurl :link,
              name : picName,
              category: category,
              uid:user.uid
            });
            accpt('success');
      }, Error =>{
        rejc(Error.message);
        console.log(Error.message);
        });
      })
    }
  viewPicGallery(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });
  return new Promise((accpt,rejc) =>{
    loading.present();
    var user = firebase.auth().currentUser
    firebase.database().ref("uploads" ).on("value", (data: any) => {
    var a = data.val();
      if( a !== null){
 
      }
      console.log(a);
    accpt(a);
  }, Error =>{
    rejc(Error.message)
  })
  })
  }
  getUserID(){
    return new Promise((accpt,rejc) =>{
      var user = firebase.auth().currentUser
      firebase.database().ref("uploads" ).on("value", (data: any) => {
      var a = data.val();
        if( a !== null){
 
        }
        console.log(a);
      accpt(user.uid);
    }, Error =>{
      rejc(Error.message)
    })
    })
  }

  deletePicture(key: any) {
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("uploads/" + user.uid).child(key).remove().then(() => {
      }, Error => {
        rejc(Error.message);
        console.log(Error.message);
      });
    })
  }
  selectCategory(category) {
    return new Promise((pass, fail) => {
      firebase.database().ref("uploads").on('value', (data: any) => {
        let uploads = data.val();
        console.log(uploads);
        var keys: any = Object.keys(uploads);
        for (var j = 0; j < keys.length; j++) {
          firebase.database().ref("uploads").on('value', (data2: any) => {
            let uploads2 = data2.val();
            console.log(uploads2);
            var keys2: any = Object.keys(uploads2);
            for (var i = 0; i < keys2.length; i++) {
              var k = keys2[i];
              if (category == uploads2[k].category){
                let objt = {
                  name: uploads2[k].name,
                  category: uploads2[k].category,
                  downloadurl: uploads2[k].downloadurl
                }
                this.arr.push(objt);
                console.log(this.arr);
              }
            }
          }),pass(this.arr);
        }
      })
    })
  }
}