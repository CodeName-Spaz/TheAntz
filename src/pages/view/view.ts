import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { obj } from '../../app/class';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { EmailComposer } from '@ionic-native/email-composer';
import firebase from 'firebase';
import { CategoryPage } from '../category/category';


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
  keys2;
  keyLike
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
  numlikes;
  removelike;
  username;
  commentsLeng;
  LikesLeng;
  location;
  numlikes;
  viewComments;
  viewlike;
  price
  currentUserId;
  likeArr = [];
  obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, private emailComposer: EmailComposer) {
    this.obj = this.navParams.get("obj");
    console.log("this is my index");
    console.log(this.email);

    this.name = this.obj.name;
    this.downloadurl = this.obj.pic;
    this.keys2 = this.obj.key;
    this.downloadurl1 = this.obj.url

    this.numComments = this.obj.comments;
    this.email = this.obj.email;
    this.name = this.obj.name;
    this.description = this.obj.description;
    this.location = this.obj.location;
    this.price = this.obj.price;
    this.numlikes = this.obj.likes;




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

      console.log("janet");
      this.commentsLeng = this.arr2.length;
      console.log(this.commentsLeng);
    })


  }
  likePicture() {
   // this.art.likePic(this.obj.key)
   this.art.viewLikes(this.obj.key).then(data =>{
     console.log(data)
     if (data == "not found"){
      this.art.likePic(this.obj.key);
      this.art.addNumOfLikes(this.obj.key, this.numlikes);
      this.numlikes ++;
       }

     
     else {
      this.art.removeLike(this.obj.key, this.numlikes,data);
      this.numlikes --;
     }
   })
   
 
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


  CommentPic(key) {
    this.art.comments(this.obj.key, this.comment).then((data: any) => {
      this.art.addNumOfComments(this.obj.key, this.numComments).then(data => {
        this.art.viewComments(this.obj.key, this.viewComments).then(data => {
          this.arr2.length = 0;
          this.viewcomments();
        })
      })
      this.numComments++;
      console.log(this.numComments)
    })
    this.comment = "";
  }

}

