import { Component } from '@angular/core';
import { LoadingController,IonicPage,ViewController, NavController, NavParams, Popover, PopoverController, Loading } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { LoginPage } from '../login/login';
/**
 * Generated class for the PopOverProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-over-profile',
  templateUrl: 'pop-over-profile.html',
})
export class PopOverProfilePage {

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public popCtrl:  PopoverController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverProfilePage');
  }
  nextpage(){
    this.navCtrl.push(EditProfilePage);
    this.viewCtrl.dismiss();
  }
 
  logout(){
    // this.viewCtrl.dismiss();
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.art.logout().then(()=>{
      this.navCtrl.push(LoginPage);
    },(error)=>{})
    }
}
