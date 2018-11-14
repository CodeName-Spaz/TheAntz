import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { OrderModalPage } from '../order-modal/order-modal';
import { ViewInforPage } from '../view-infor/view-infor';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  private buttonColor: string = "primary"
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
  uid: any;
  tempdownloadurl;
  tempemail;
  key;
  list = [];
  retriveCustomerDetails = [];
  xxx ;
  currentUserId;
  artId;
  // obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams,public art: StreetartzProvider) {
    // this.obj = this.navParams.get("obj");

    // console.log(this.obj.tempName);
    // console.log(this.obj.downloadurl);
    // this.downloadurl = this.obj.downloadurl;
    // this.email = this.obj.email;
    // this.price = this.obj.price;
    // this.name1 = this.obj.name1;
    // this.tempdownloadurl = this.obj.tempdownloadurl
    // this.tempName = this.obj.tempName;
    // this.currentUserId = this.obj.currentUserId;
    // this.currentUser =this.obj.currentUser 
 






// This is my user ID as the peson logged in
    let currentUser = firebase.auth().currentUser.uid;
    console.log(currentUser);
   

  //   this.artId = firebase.auth().currentUser.uid;
  // console.log(this.artId);


    let currentUserId =firebase.auth().currentUser.uid
    firebase.database().ref('Orders/' + currentUserId).on("value", (data: any) => {
      this.retriveCustomerDetails.length =0;
      let infor = data.val();
      if(data.val() !=null || data.val() !=undefined){
        let keys = Object.keys(infor);
          firebase.database().ref('Orders/' + currentUserId).on("value", (data2: any) => {
            let inforKey = data2.val();
            let keys2 = Object.keys(inforKey);
            // console.log(keys2);
            for(var i =0; i< keys.length;i++){
            var k = keys2[i];
            let obj = {
              tempName: inforKey[k].tempName,
              tempdownloadurl: inforKey[k].tempdownloadurl,
              name1: inforKey[k].name1,
              price: infor[k].price,
              email: infor[k].email,
              downloadurl: inforKey[k].downloadurl,
              message: inforKey[k].message,
              messageRead:infor[k].messageRead,
              currentUserId:infor[k].currentUserId,
              key:k

            }
            this.retriveCustomerDetails.push(obj)
            console.log(this.retriveCustomerDetails);  
            }
          })
        }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }
  scroll(event) {
    // console.log(event);

  }

  showDetails(downloadurl, tempName, tempdownloadurl, price, name1, email, message,key,currentUserId,currentUser) {
    let obj = {
      downloadurl: downloadurl,
      tempName: tempName,
      tempdownloadurl: tempdownloadurl,
      price: price,
      name1: name1,
      email: email,
      message: message,
      key:key,
      currentUserId:currentUserId,
      currentUser:currentUser
    }

    this.navCtrl.push(ViewInforPage, { obj: obj });

    
    // document.getElementById("chats").style.backgroundColor="blue"
  
  }


}
