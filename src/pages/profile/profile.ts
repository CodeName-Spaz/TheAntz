import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { CategoryPage } from '../category/category';
import { UploadImagePage } from '../upload-image/upload-image';
import { ModalController, ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopOverProfilePage } from '../pop-over-profile/pop-over-profile';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  list = [];
  arr = [];
  uid: any;
  obj;
  url='../../assets/beats.jpg' ;
  name;
  imageUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  }
  ngOnInit() {
    this.obj = this.navParams.get("obj");
    console.log(this.obj);
  }
  insertpic(event:any){
    if (event.target.files && event.target.files[0]){
      let reader = new FileReader();
      reader.onload = (event:any) =>{
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader.onload);
    }

  }

 
  uploadPicture(){
    this.art.uploadPic(this.url,this.name).then(data =>{
      this.imageUrl = data;
       this.art.storeProfilePics(data).then(() =>{
         console.log('added to db');
       },
      Error =>{
        console.log(Error)
      })
    }, Error =>{
      console.log(Error )
    })
  }
  next() {
    this.navCtrl.push(CategoryPage);
  }

  upload() {
    const modal = this.modalCtrl.create(UploadImagePage);
    modal.present();
  }
  presentPopover() {
    const popover = this.popoverCtrl.create(PopOverProfilePage);
    popover.present();
  }

  
  getUid(){
    this.art.getUserID().then(data =>{
      this.uid = data
    })
  }

  retreivePics() {
    this.getUid();
    this.art.viewPicGallery().then(data => {
      var loader = this.loadingCtrl.create({
        content: "please wait...",
        duration: 6000
      });
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.uid == data[k].uid) {
          let obj = {
            uid: data[k].uid,
            category: data[k].category,
            downloadurl: data[k].downloadurl,
            name: data[k].name,
            key: k
          }
          this.list.push(obj);
        }
      }
      loader.dismiss();
    }, Error => {
      console.log(Error)
    });
  }
 
}
