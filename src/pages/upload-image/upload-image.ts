import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  photos:any;
  camera;
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
  photo(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     
     this.photos = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    console.log(err);
    
    });
  }
  pick(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    
    this.camera.getPicture(options).then((imageData) => {
     
     this.photos = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    console.log(err);
    
    });

  }
  uploadPicture() {
    if (this.category == undefined || this.category == null ,
      this.name == undefined || this.name == null ,
      this.description == undefined || this.description == null,
      this.location == undefined || this.location == null,
      this.price == undefined || this.price == null ,
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
    } else if (this.category == null || this.category ==undefined) {
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
    else if (this.price.length > 11 || this.price.length == "") {
      const confirm = this.alertCtrl.create({
        title: "price",
        subTitle: "the price should not be more than 9999",
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            }
          },
        ]
      });
      confirm.present();
    }  else if (this.url == '../../assets/default.jpg') {
      const confirm = this.alertCtrl.create({
        title: "uploadImage",
        subTitle: "please select a imagine to continue..",
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
    else if (this.location == null || this.location ==undefined) {
      const confirm = this.alertCtrl.create({
        title: "location",
        subTitle: "please select a location to continue..",
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
    else if (this.name == null || this.location ==undefined) {
      const confirm = this.alertCtrl.create({
        title: "name",
        subTitle: "please select a name to continue..",
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
    else if (this.description == null || this.description ==undefined) {
      const confirm = this.alertCtrl.create({
        title: "description",
        subTitle: "please select a description to continue..",
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
  showAction(event){
    console.log(event.type + " button");
    
    let action = document.getElementsByClassName('options') as HTMLCollectionOf <HTMLElement>;

    
      action[0].style.transform = "translateY(-350%)";
      action[0].style.transition = 150 + "ms ease " + 500 + "ms";

  }
  decide(event){
    console.log('clicked body');
    let dropAction = document.getElementsByClassName('options') as HTMLCollectionOf <HTMLElement>;
    dropAction[0].style.transform = "translateY(0%)";
  }
}
