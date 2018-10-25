import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
/**
 * Generated class for the UploadImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImagePage {
  url = '../../assets/default.jpg';
  name;
  category;
  imageUrl;
  arr = [];
  description;
  location;
  price;
  downloadurl;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public view: ViewController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadModalPage');
  }

  insertvid(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader.onload);
    }
  }
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k >= 48 && k <= 57));
  }
  uploadPicture() {
    if (this.category == undefined ||
      this.name == undefined ||
      this.description == undefined ||
      this.location == undefined ||
      this.price == undefined ||
      this.url == '../../assets/default.jpg') {
      const confirm = this.alertCtrl.create({
        title: "Fields Missing",
        subTitle: "Please make sure that all the fields are filled.",
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            }
          },
        ]
      });
      confirm.present();
    }
    else if(this.category == undefined){
      const confirm = this.alertCtrl.create({
        title: "category",
        subTitle: "you did not select the category",
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            }
          },
        ]
      });
      confirm.present();
    }
    else {
      this.art.uploadPic(this.url).then(data => {
        this.art.storeToDB(data, this.category, this.name, this.description, this.location, this.price).then(() => {
          this.navCtrl.setRoot(ProfilePage);
        },
          Error => {
            console.log(Error)
          })
      }, Error => {
        console.log(Error)
      })

    }

  }


  dismiss() {
    this.navCtrl.setRoot(CategoryPage);
  }
}

