import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { obj } from '../../app/class';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { EmailComposer } from '@ionic-native/email-composer';
import * as firebase from 'firebase';
/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
//viewpage Ts\\

export class ViewPage {
  comment: any;
  data: any;
  name;
  downloadurl;
  description;
  downloadurl1;
  downloadurl3;
  key;
  arr = [];
  arr2 = [];
  uid: any
  PicUrl: any;
  url;
  numComments;
  Comments = [];
  email;
  comments;
  like;
  obj: any;
  numlikes;
  viewlike;
  removelike;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, private emailComposer: EmailComposer) {
    this.obj = this.navParams.get("obj");
    console.log("this is my index");
    console.log(this.email);

    this.name = this.obj.name;
    this.downloadurl = this.obj.pic;
    this.uid = this.obj
    this.key = this.obj.key;
    this.downloadurl1 = this.obj.url
    this.comments = this.obj.comments
    this.email = this.obj.email
    this.numlikes =  this.obj.likes;
    this.removelike= this.obj.likes;

    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        console.log(available);
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    console.log(this.obj);

  }

  BuyArt() {
    let email = {
      to: this.obj.email,
      cc: 'theantz39@gmail.com',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    this.emailComposer.open(email);
    // this.art.sendEmail(email);
    // Send a text message using default options

  }

  GoBackToCategory() {
    this.navCtrl.pop();
  }
  sendComment(comment) {
    this.art.comments(this.obj.key, this.comment).then((data) => {
      this.art.addNumComments(this.obj.key, this.comments);
      console.log(data);
      // this.Comments.length =0;
      this.arr2.length = 0;
      this.view();
    })
  }

  view() {
    this.art.viewComments(this.obj.key, this.comment).then((data) => {
      console.log(data)
      var keys1: any = Object.keys(data);
      for (var i = 0; i < keys1.length; i++) {
        var key = keys1[i];
        let obj = {
          comment: data[key].comment,
          uid: data[key].uid,
          downloadurl: data[key].url,
          username: data[key].username,
          date: data[key].date
        }
        this.arr2.push(obj);
        console.log(data);
      }
    })

  }


  likePic(key,obj) {

  if (this.obj.key) {
    this.art.likePic(this.obj.key).then((data: any) => {
    this.art.addNumOfLikes(this.obj.key, this.numlikes).then (data =>{


  })
  this.art. viewLikes(this.obj.key, this.viewlike).then (data =>{
    
 
   })
   this.numlikes++;
   console.log(this.obj.name)
 })


 }
 else if (key.obj) {
   this.art.removeLike(this.obj.key, this.obj.removelike).then (data =>{
    this.art. viewLikes(this.obj.key, this.viewlike).then (data =>{
    
 
    })
    this.numlikes--;

   })

   
 }

 else{
 
 }
  }
  comLikes(key) {

    if (key.obj) {
      this.art.comLikes(this.obj.key).then((data: any) => {
        this.art.addNumOfLikes(this.obj.key, this.numlikes).then (data =>{
    this.art. viewLikes(this.obj.key, this.viewlike).then (data =>{
      
    })
     })
     this.numlikes++;
   })
  
  
   }
   else if (key.obj) {
    this.art.removeLike(this.obj.key, this.obj.removelike).then (data =>{
     this.art. viewLikes(this.obj.key, this.viewlike).then (data =>{
     
  
     })
     this.numlikes--;
 
    })
 
    
  }
 
  else{
   this.art.addNumOfLikes(this.obj.key, this.numlikes).then (data =>{
 
 
   })
  }
   
  }
  
}







//   else if  (this.PicUrl[key]){
//     let user = firebase.auth().currentUser;
//     this.art.removeLike(this.PicUrl[key].name, this.PicUrl[key].key, this.PicUrl[key].likes).then (data =>{
//      this.ionViewDidLoad();
//      console.log(key)
//     })
//  }
// else{
//   let user = firebase.auth().currentUser;
// this.art.addNumOfLikes(this.key.name, this.key.key, this.PicUrl.key.likes).then (data =>{
// this.ionViewDidLoad();
// console.log(key)
// })