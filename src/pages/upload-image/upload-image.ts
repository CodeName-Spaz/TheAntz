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

  uploadPicture() {
    if(this.url !="../../assets/default.jpg"){     
   
    if (this.category == undefined || this.category == null,
      this.name == undefined  || this.name == null ,
      this.description == undefined || this.description == null,
      this.location == undefined ||this.location == null,
      this.price == undefined || this.price == null) {
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
    else{
      console.log('no image');
      const confirm = this.alertCtrl.create({
        title: "No Image",
        subTitle: "Please insert a photograph to continue.",
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
    
  }


  dismiss() {
    this.navCtrl.setRoot(CategoryPage);
  }
}
