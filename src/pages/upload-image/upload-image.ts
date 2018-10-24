import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
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
  d;
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
    this.uploadPicture();
  }

  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //         k = event.keyCode;  (Both can be used)
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  uploadPicture() {

    if (this.category == undefined || this.category == null,
      this.name == undefined || this.name == null,
      this.description == undefined || this.description == null,
      this.location == undefined || this.location == null,
      this.price == undefined || this.price == null,
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
 
    else if (this.name ==null || this.name == undefined) {
      const confirm = this.alertCtrl.create({
        title: "Artwork Name Missing",
        subTitle: "Please enter a name for your artwork to continue..",
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
    else if (this.category ==null || this.category == undefined) {
      const confirm = this.alertCtrl.create({
        title: "Category Not Chosen",
        subTitle: "Please choose a category to continue..",
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
    else if (this.description == undefined || this.description == null) {
      const confirm = this.alertCtrl.create({
        title: "No Description",
        subTitle: "Please type in your description to continue..",
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
    else if (this.location == undefined || this.location == null) {
      const confirm = this.alertCtrl.create({
        title: "Oops",
        subTitle: "It looks like you didn't enter your location...",
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
    else if (this.price == undefined || this.price == null) {
      const confirm = this.alertCtrl.create({
        title: "price",
        subTitle: "Please upload your photo to continue..",
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
    else if (this.price.length > 4) {
      const confirm = this.alertCtrl.create({
        title: "Price Too Long",
        subTitle: "Price cannot exceed 9999",
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
    else if (this.url == '../../assets/default.jpg') {
      const confirm = this.alertCtrl.create({
        title: "No Photo",
        subTitle: "Please upload your photo to continue.",
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




  
  uploadPicture(){
    this.art.uploadPic(this.url,this.name).then(data =>{
      this.imageUrl = data;
    }, Error =>{
      console.log(Error )
    })

  }


  dismiss() {
    this.view.dismiss();
  }

}


  uploadData(){
    this.art.storeToDB(this.imageUrl, this.category, this.name).then(() =>{
      console.log('added to db');
     //  this.navCtrl.view(ProfilePage);
    this.view.dismiss();
      },
        Error =>{
      console.log(Error)
   })
  
  }
  
  
 
}

