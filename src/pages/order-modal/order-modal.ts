import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
/**
 * Generated class for the OrderModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-modal',
  templateUrl: 'order-modal.html',
})
export class OrderModalPage implements OnInit {
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
  arr = [];
  tempName;
  uid:any;
  tempdownloadurl;
  tempemail;
  retriveCustomerDetails = [];
  obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams,public art: StreetartzProvider,public toastCtrl: ToastController) {
    this.obj = this.navParams.get("obj");


    console.log(this.obj.email);
    console.log(this.obj.uid);
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

    let userID = firebase.auth().currentUser;
      firebase.database().ref("profiles/" + userID.uid).on('value', (data: any) => {
      this.arr.length = 0
      let details = data.val();
      this.arr.push(details);
      console.log(this.arr);
    })

    this.art.returnUID().then((data)=>{
      this.tempName = data[0].name;
      this.tempdownloadurl = data[0].downloadurl;
      console.log(this.tempName);
      //  console.log(this.tempdownloadurl);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalPage');
  }
  ngOnInit() {
    this.art.returnUID().then((data)=>{
      this.tempName = data[0].name;
      this.tempdownloadurl = data[0].downloadurl;
      this.tempemail = data[0].email;
      console.log(this.tempemail);
      //  console.log(this.tempdownloadurl);
    })
  }
  sendInformation(){
    var user = firebase.auth().currentUser;
      firebase.database().ref('Orders/'+ this.obj.uid).push({
        tempName:this.tempName,
        tempdownloadurl:this.tempdownloadurl,
        email:this.tempemail,
        name1:this.obj.name1,
        price:this.obj.price,
        downloadurl : this.obj.pic,
      })
      const toast = this.toastCtrl.create({
        message: 'you have made ur booking!',
        duration: 3000
      });
      toast.present();
  }
  retrieveINformation(){
    firebase.database().ref("orders").on("value",(data:any)=>{
      data = data.val();
      let keys = Object.keys(data)

      let obj ={
        tempName :data.tempName,
        tempdownloadurl:data.tempdownloadurl,
        email:data.obj.email,
        name1:data.obj.name1,
        price:data.obj.price,
        downloadurl : data.obj.pic,
      }
      this.retriveCustomerDetails.push(obj);
      console.log(this.retriveCustomerDetails);
    })
  }
}
