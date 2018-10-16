import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnInit {
  arr = [];
  obj;
  email: any;
  name: any;
  file;
  bio;
  contact;
  skill;
  uid;
  uid1;
  url;
  details
  downloadurl
  imageUrl: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

  }
  nexpage() {
    this.navCtrl.setRoot(ProfilePage);
  }
  ionViewDidLoad() {
    this.retreivePics1();
  }
  ngOnInit() {
    this.art.retrieve().on('value', (data: any) => {
      let details = data.val();
      this.name = details.name;
      this.email = details.email
      this.contact = details.contact
      this.downloadurl = details.downloadurl
      this.bio = details.bio
      console.log(details);
    })
  }
  insertpic(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader.onload);
    }

  }
  uploadPicture() {
    this.arr.length = 0;
    this.art.uploadProfilePic(this.downloadurl, this.name).then(data => {
      // this.art.storeToDB1(this.name).then(() => {
        console.log('added to db');
        this.art.update(this.name,this.email,this.contact,this.bio,this.downloadurl).then((data) => {
          this.arr.push(data);
          console.log(data);
        })
        this.navCtrl.push(ProfilePage);
      },
        Error => {
          console.log(Error)
        })
    // }, Error => {
    //   console.log(Error)
    // })
  }
  getUid1() {
    this.art.getUserID().then(data => {
      this.uid1 = data
    })
  }
  retreivePics1() {
    this.arr.length = 0;
    this.getUid1();
    this.art.viewPicGallery1().then(data => {
      var loader = this.loadingCtrl.create({
        content: "please wait...",
        duration: 6000
      });
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.uid == data[k].uid) {
          let objt = {
            downloadurl: data[k].downloadurl
          }
          this.arr.push(objt);
          console.log(this.arr)
        }
      }
      loader.dismiss();
    }, Error => {
      console.log(Error)
    });
  }

}