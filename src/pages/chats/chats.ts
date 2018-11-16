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
  xxx;
  currentUserId;
  artId;
  tempUid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider) {

    let currentUser = firebase.auth().currentUser.uid;
    console.log(currentUser);


    let currentUserId =firebase.auth().currentUser.uid
    console.log(currentUserId);
    firebase.database().ref('Orders/' + currentUserId).on("value", (data: any) => {
      let infor = data.val();
      if(data.val() !=null || data.val() !=undefined){
        this.retriveCustomerDetails.length =0;
        let keys = Object.keys(infor);
          firebase.database().ref('Orders/' + currentUserId).on("value", (data2: any) => {
            let inforKey = data2.val();
            let keys2 = Object.keys(inforKey);
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
              uid:infor[k].uid,
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

  showDetails(downloadurl, tempName, tempdownloadurl, price, name1, email, message, key, currentUserId, uid) {
    let obj = {
      downloadurl: downloadurl,
      tempName: tempName,
      tempdownloadurl: tempdownloadurl,
      price: price,
      name1: name1,
      email: email,
      message: message,
      key: key,
      uid: uid,
      currentUserId: currentUserId
    }

    this.navCtrl.push(ViewInforPage, { obj: obj });
  }


}
