import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { OrderPage } from '../order/order';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('this is the portal used by the artist to check his/her orders');
  }
  scroll(event){
    console.log(event);
    
  }
  showDetails(){
 this.navCtrl.push(OrderPage)
  
    
  }
  goBack(){
    this.navCtrl.pop();
  }


}
