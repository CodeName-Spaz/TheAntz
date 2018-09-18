import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { ProfilePage } from '../profile/profile';

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
  url;
  name;
  category;
  picDesc;
  imageUrl:any;
  arr=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public art: StreetartzProvider,public view :ViewController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadModalPage');
  }
  // viewImage(){
  //   this.art.viewPic().then((data)=>{
  //     console.log(data);
  //   })
  // }
 
  insertvid(event:any){
    if (event.target.files && event.target.files[0]){
      let reader = new FileReader();
      reader.onload = (event:any) =>{
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader.onload);
    }
    this.uploadPicture();
  }
  
  uploadPicture(){
    this.art.uploadPic(this.url,this.name).then(data =>{
      this.imageUrl = data;
    }, Error =>{
      console.log(Error )
    })
  }
  dismiss(){
    this.view.dismiss();
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