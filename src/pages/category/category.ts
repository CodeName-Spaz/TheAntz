import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ProfilePage } from '../profile/profile';
import { ViewPage } from '../view/view';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { ChatsPage } from '../chats/chats';


/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage{
  obj = {} as obj
  category: any;
  categoryArr = [];
  uid: any;
  list = [];
  name;
  username;
  comments;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public appCtrl: App) {
    // this.retreivePics();
  }
  chats(){
    this.navCtrl.push(ChatsPage)
  }
  GoToProfilePage() {
    this.navCtrl.push(ProfilePage);
  }
  ngAfterViewInit() {
    this.retreivePics();
  }
    reload(){
      this.categoryArr.length = 0;
      this.art.viewPicMain(this.name,this.username).then((data: any) => {
        this.categoryArr = [];
        this.categoryArr = data;
      });
    }
  typeOfArt() {
    this.art.selectCategory(this.category).then((data) => {
      if (data == undefined || data == null) {
        console.log('empty')
      }
      else if (this.category == 'All') {
        firebase.database().ref("uploads").on("value", (data: any) => {
         let details = data.val();
        //  this.categoryArr.push(details);
         console.log(details)

        })
     }
      else {
        this.categoryArr.length = 0;
        this.categoryArr = [];
        var keys: any = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if (this.category == data[k].category) {
            let obj = {
              category: data[k].category,
              downloadurl: data[k].downloadurl,
              name: data[k].name,
              key: k,
              url: data[k].url,
              comments: data[k].comments,
              username: data[k].username,
              likes: data[k].likes,
              email: data[k].email,
              location: data[k].location,
              price: data[k].price,
            }
            this.categoryArr.push(obj);
     
          }
        }
      }
   
    })

  }
  retreivePics() {
      this.categoryArr.length = 0;
      this.art.viewPicMain(this.name,this.username).then((data: any) => {
      this.categoryArr = [];
      this.categoryArr = data;
      this.categoryArr.reverse();
    });
  }
  pushArtistDetails(pic, name, key, url, comments, email, username, description, location, price, likes,name1) {
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
      name1:name1
    }
    this.navCtrl.push(ViewPage, { obj: obj });

  }


}