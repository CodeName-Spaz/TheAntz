import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  username;
  downloadurl;
  keys2;
  downloadurl1;
  email;
  name;
  name1;
  description;
  price;
  location;
  numlikes;
  numComments;
  message="greetings, I would like to purchase this artwork from you. Please reach me on my email"
  obj = this.navParams.get("obj");
  downloadurls;
  emails;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.obj = this.navParams.get("obj");


    console.log(this.obj.email);
    console.log(this.obj);
  
    this.username = this.obj.username;
    this.downloadurl = this.obj.pic;
    this.keys2 = this.obj.key;
    this.downloadurl1 = this.obj.url
    this.numComments = this.obj.comments;
    this.email = this.obj.email;
    this.name = this.obj.name;
    this.description = this.obj.description;
    this.location = this.obj.location;
    this.price = this.obj.price;
    this.numlikes = this.obj.likes;
    this.name1 = this.obj.name1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }
  scan(event){
    console.log(event.path[0].attributes[1].ownerElement.height);
    console.log('half '+(event.path[0].attributes[1].ownerElement.height* 0.5 - 50));
    
    var wMark = document.getElementsByClassName('watermark') as HTMLCollectionOf <HTMLElement>;

    wMark[0].style.top = (event.path[0].attributes[1].ownerElement.height* 0.5 - 50) + "px";
    wMark[0].style.transform = "TranslateY(-50px)"
  }
  sendRequest(){
    this.message = '';
    var sentMessage = document.getElementsByClassName('message') as HTMLCollectionOf <HTMLElement>;

    let info = document.getElementsByClassName('data') as HTMLCollectionOf <HTMLElement>;
    info[0].style.transform = "translateX(120%)";
    info[0].style.height = 0 + "px";
    sentMessage[0].style.display = "block";

    this.downloadurls = this.obj.pic;
   
  }



}
