import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  username;
  downloadurl;
  keys2;
  downloadurl1;
  email;
  name;
  name1;
  description;
  price;
  location;
  numlikes;
  numComments;
  message = "Greetings, I would like to purchase this artwork from you. Please reach me on my email "
<<<<<<< HEAD:src/pages/order/order.ts
  downloadurls;
  emails;
=======
>>>>>>> a44a7194bfb63fb7d0c14bfd35a387c6fe62545d:src/pages/order-modal/order-modal.ts
  arr = [];
  tempName;
  uid: any;
  tempdownloadurl;
  tempemail;
  height;
  retriveCustomerDetails = [];
  display=[];
  messageRead="message read"
  obj = this.navParams.get("obj");

<<<<<<< HEAD:src/pages/order/order.ts

  constructor(public navCtrl: NavController, public navParams: NavParams,public art: StreetartzProvider,public toastCtrl: ToastController) {
=======
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public toastCtrl: ToastController) {
>>>>>>> a44a7194bfb63fb7d0c14bfd35a387c6fe62545d:src/pages/order-modal/order-modal.ts
    this.obj = this.navParams.get("obj");


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

    console.log(this.obj.name1);

    let userID = firebase.auth().currentUser;
    firebase.database().ref("profiles/" + userID.uid).on('value', (data: any) => {
      this.arr.length = 0
      let details = data.val();
      this.arr.push(details);
      console.log(this.arr);
    })

    this.art.returnUID().then((data) => {
      this.tempName = data[0].name;
      this.tempdownloadurl = data[0].downloadurl;
      console.log(this.tempName);
      //  console.log(this.tempdownloadurl);
    })
    this.imageSize()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ngOnInit() {
<<<<<<< HEAD:src/pages/order/order.ts
    // this.art.returnUID().then((data)=>{
    //   this.tempName = data[0].name;
    //   this.tempdownloadurl = data[0].downloadurl;
    //   this.tempemail = data[0].email;
    //   console.log(this.tempemail);
    //   //  console.log(this.tempdownloadurl);
    // })
  }
  
  scan(event) {
    console.log(event.path[0].attributes[1].ownerElement.height);
    console.log('half ' + (event.path[0].attributes[1].ownerElement.height * 0.5 - 50));

    var wMark = document.getElementsByClassName('watermark') as HTMLCollectionOf<HTMLElement>;

    wMark[0].style.top = (event.path[0].attributes[1].ownerElement.height * 0.5 - 50) + "px";
    wMark[0].style.transform = "TranslateY(-50px)"
  }
  imageSize(){
    setTimeout(() => {
    this.scan(event);
  }, 3000);
  }
  sendRequest() {

    let sentMessage = document.getElementsByClassName('message') as HTMLCollectionOf<HTMLElement>;
    let info = document.getElementsByClassName('data') as HTMLCollectionOf<HTMLElement>;
    info[0].style.transform = "translateX(120%)";
    info[0].style.height = 0 + "px";
    sentMessage[0].style.display = "block";

    // this.downloadurls = this.obj.pic;
  }

  sendInformation(){
=======
    this.art.returnUID().then((data) => {
      this.tempName = data[0].name;
      this.tempdownloadurl = data[0].downloadurl;
      this.tempemail = data[0].email;
      console.log(this.tempemail);
      this.imageSize()
      //  console.log(this.tempdownloadurl);
    })
  }
  scanner(event) {
    // console.log(event.path[0].attributes[1].ownerElement.height);
    // console.log('half ' + (event.path[0].attributes[1].ownerElement.height * 0.5 - 50));

    // console.log(event);
    
    var wMark = document.getElementsByClassName('watermarks') as HTMLCollectionOf<HTMLElement>;
    this.height = event.path[0].clientHeight;
    wMark[0].style.top = (this.height /3) + "px";
    wMark[0].style.transform = "translateY(-50px)";
    wMark[0].style.width = 100 + "%";
    // wMark[0].style.transform = "TranslateY(500px)"
    console.log(this.height);
    
  }
  imageSize() {
    setTimeout(() => {
      // this.scanner(event);
    }, 3000);
  }
  sendRequest() {

    let sentMessage = document.getElementsByClassName('message') as HTMLCollectionOf<HTMLElement>;
    let info = document.getElementsByClassName('data') as HTMLCollectionOf<HTMLElement>;
    info[0].style.transform = "translateX(120%)";
    info[0].style.height = 0 + "px";
    sentMessage[0].style.display = "block";

    // this.downloadurls = this.obj.pic;
  }
  sendInformation() {
    this.display.length =0;
>>>>>>> a44a7194bfb63fb7d0c14bfd35a387c6fe62545d:src/pages/order-modal/order-modal.ts
    var user = firebase.auth().currentUser;
    firebase.database().ref('Orders/' + this.obj.uid).push({
      tempName: this.tempName,
      tempdownloadurl: this.tempdownloadurl,
      email: this.tempemail,
      name1: this.obj.name1,
      price: this.obj.price,
      downloadurl: this.obj.pic,
      messageRead :"message read",
      message:this.message,
 
    })
     this.message=""
    
    

    const toast = this.toastCtrl.create({
      message: 'you have made ur booking!',
      duration: 3000
    });
    toast.present();
  }
<<<<<<< HEAD:src/pages/order/order.ts



=======
  retrieveINformation() {
    firebase.database().ref('Orders/' + this.obj.uid).on("value", (data: any) => {
      data = data.val();
      this.retriveCustomerDetails.push(data);
      console.log(this.obj.uid);
    })
  }
>>>>>>> a44a7194bfb63fb7d0c14bfd35a387c6fe62545d:src/pages/order-modal/order-modal.ts
}
