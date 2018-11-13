import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import firebase from 'firebase';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
/**
 * Generated class for the ViewInforPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-infor',
  templateUrl: 'view-infor.html',
})
export class ViewInforPage implements OnInit{
  downloadurl;
  tempName;
  price;
  name1;
  email;
  message;
  tempdownloadurl;
  list = [];
  currentUserId;
  arrMsg = [];
  currentUser;
  uid:any;
  primaryKey;
  foreignKey;

  // message;
  side=["sent","received"];
  obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer, public art: StreetartzProvider) {
    this.obj = this.navParams.get("obj");

    console.log(this.obj.tempName);
    console.log(this.obj.downloadurl);
    this.downloadurl = this.obj.downloadurl;
    this.email = this.obj.email;
    this.price = this.obj.price;
    this.name1 = this.obj.name1;
    this.tempdownloadurl = this.obj.tempdownloadurl
    this.tempName = this.obj.tempName;
    this.currentUserId = this.obj.currentUserId;
    this.uid = this.obj.uid;
 

    console.log('===========================');
    
    console.log(this.currentUserId);
    console.log(this.obj.uid);
    console.log('===========================');
    

    // this.currentUser = firebase.auth().currentUser.uid

    // alert("art currentuser" + this.currentUserId+ " client userid " + currentUser);

    // if(this.currentUserId == currentUser){

      

    // }
    this.list.length = 0;

    // console.log(currentUser);
    //  this.currentUserId =firebase.auth().currentUser.uid
    //  console.log(this.currentUserId);
    
    // this.decideSide()

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewInforPage');

  }
  ngOnInit() {
    this.art.returnUID().then((data)=>{
      this.tempName =data[0].name;
      this.tempdownloadurl = data[0].downloadurl;
      console.log(this.tempName);
    })
  }

  send() {
    this.art.BuyPicture(this.currentUser, this.currentUserId, this.message).then((data) => {
      console.log(data);
    })
  }
  getData() {
    this.art.retrieveChats(this.currentUser, this.currentUserId, this.message).then((data:any) => {
      this.arrMsg.length =0;
      // this.arrMsg=[];
      this.arrMsg =data;
     
  })
  }

}