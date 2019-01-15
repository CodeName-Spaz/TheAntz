import { Component, OnInit, style } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { obj } from '../../app/class';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { EmailComposer } from '@ionic-native/email-composer';
import { CategoryPage } from '../category/category';
import { OrderModalPage } from '../order-modal/order-modal';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


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

export class ViewPage implements OnInit {
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
  num;
  numComments;
  message = "Greetings, I would like to purchase this artwork from you. Please reach me on my email "
  Comments = [];
  email;
  comments;
  likes;
  like;
  username;
  commentsLeng;
  LikesLeng;
  location;
  numlikes;
  viewComments;
  viewlike;
  price;
  name1;
  currentUserId;
  likeArr = [];
  CommentArr = [];
  tempName;
  tempdownloadurl;
  userId;
  display = [];
  tempemail;

  obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, private emailComposer: EmailComposer, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.obj = this.navParams.get("obj");

    console.log(this.obj.email);
    console.log(this.obj.name1);
    this.username = this.obj.username;
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
    this.name1 = this.obj.name1;
    this.uid = this.obj.uid



    this.currentUserId = firebase.auth().currentUser.uid
      
    console.log(this.currentUserId);
    console.log(this.obj.uid);

    this.Retrivecomments();
    console.log(this.obj.name);
    // console.log(this.obj.pic);
    console.log(this.obj.username);
    // console.log(this.uid);
    // console.log(this.obj.url)
    console.log(this.currentUserId);

    this.art.returnUID().then((data) => {
      this.tempName = data[0].name;
      this.tempdownloadurl = data[0].downloadurl;
      this.tempemail = data[0].email;
      console.log(this.tempName);

      // console.log(this.tempdownloadurl);
      this.ifOrderYes();
    })
  }
  ngOnInit() {
    this.Retrivecomments() 
    this.art.returnUID().then((data) => {
      this.tempName = data[0].name;
      this.tempdownloadurl = data[0].downloadurl;
      console.log(this.tempName);
      this.ifOrderYes();
    })
  }

  imageSize() {
    setTimeout(() => {
      this.scan(event);
    }, 3000);
  }
  ifOrderYes() {
    if (this.currentUserId == this.uid) {
      let btnOrder = document.getElementsByClassName('theStatements') as HTMLCollectionOf<HTMLElement>
      btnOrder[0].style.display = "none";
    }

  }
  scroll(event) {
    let page = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;
    let backBTN = document.getElementsByClassName('theWidth') as HTMLCollectionOf<HTMLElement>;
    let theContent = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;
    let waterMark = document.getElementsByClassName('watermark') as HTMLCollectionOf<HTMLElement>;
    var toolbar = document.getElementsByClassName('secondary') as HTMLCollectionOf<HTMLElement>;
    if (event.scrollTop > 60 && event.directionY == "down") {
      backBTN[0].style.transform = "translateY(-100%)";
      backBTN[0].style.transition = 0.5 + "s";
    }
    else if (event.directionY == 'up' && event.deltaY < -30) {
      backBTN[0].style.transform = "translateY(0%)";
    }
    else if (event.scrollTop <= 30) {
      backBTN[0].style.transform = "translateY(0%)";
    }
    if (event.scrollTop != 0) {
      toolbar[0].style.backgroundColor = "rgb(1,17,39)";
      toolbar[0].style.transition = 700 + "ms";
    }
    else if (event.scrollTop < 10) {
      toolbar[0].style.background = "linear-gradient(rgba(0, 0, 0,0.4),rgba(0, 0, 0, 0))"

    }
    if (event.scrollTop < 10) {
      toolbar[0].style.transition = 700 + "ms";


    }


  }
  scan(event) {
    var wMark = document.getElementsByClassName('watermark') as HTMLCollectionOf<HTMLElement>;
    wMark[0].style.top = (event.path[0].attributes[1].ownerElement.height / 2.5) + "px";
    wMark[0].style.transform = "TranslateY(-50px)"
  }
  sendInformation() {
    this.art.checkOrder(this.obj.uid,this.downloadurl ).then(data =>{
      console.log(data)
      if (data == "found"){
        console.log("found")
      }
      else if (data == "not found"){
    this.display.length = 0;
    console.log(this.currentUserId);
    console.log(this.obj.uid);
    var user = firebase.auth().currentUser;
    firebase.database().ref('Orders/' + this.obj.uid).push({
      tempName: this.tempName,
      tempdownloadurl: this.tempdownloadurl,
      email: this.tempemail,
      name1: this.obj.name1,
      price: this.obj.price,
      uid: this.obj.uid,
      downloadurl: this.obj.pic,
      currentUserId: this.currentUserId
    })
      }
    })

  }


  BuyArt(pic, name, key, url, comments, email, username, description, location, price, likes, name1, uid, currentUserId) {
    let obj = {
      name: name,
      pic: pic,
      key: key,
      url: url,
      comments: comments,
      email: email,
      username: username,
      description: description,
      location: location,
      price: price,
      likes: likes,
      name1: name1,
      uid: uid,
      currentUserId: currentUserId
    }
    this.navCtrl.push(OrderModalPage, { obj: obj });
    this.sendInformation();
  }

  GoBackToCategory() {
    this.navCtrl.pop();
  }

  Retrivecomments() {
    this.art.viewComments(this.obj.key, this.comment).then((data:any) => {
      if (data == null || data == undefined) {
      }
      else {
        this.CommentArr.length = 0;

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
          this.CommentArr.push(obj);
          this.CommentArr.reverse();
        }
        this.commentsLeng = this.CommentArr.length
      }

    })

  }
  likePicture() {
    this.art.viewLikes(this.obj.key).then(data => {
      if (data == "not found") {
        this.art.likePic(this.obj.key);
        this.art.addNumOfLikes(this.obj.key, this.numlikes);
        this.numlikes++;
      }
      else {
        this.art.removeLike(this.obj.key, this.numlikes, data);
        this.numlikes--;
      }
    })


  }

  CommentPic(key) {
    if (this.comment == "" || this.comment == null) {
      const alert = this.alertCtrl.create({
        title: "Oops!",
        subTitle: "It looks like you didn't write anything on the comments, please check.",
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.art.comments(this.obj.key, this.comment).then((data: any) => {
        this.art.addNumOfComments(this.obj.key, this.numComments).then(data => {
          this.art.viewComments(this.obj.key, this.viewComments).then(data => {
            this.arr2.length = 0;
            this.Retrivecomments();
          })
        })
        this.numComments++;
      })
      this.comment = "";
    }
  }

}