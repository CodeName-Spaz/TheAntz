

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { obj } from '../../app/class';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
/*
  Generated class for the StreetartzProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StreetartzProvider {
  [x: string]: any;
  // database = firebase.database();


  currentUserID;


  selectCategory(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  key: string;
  obj = {} as obj;
  arr = [];
  category;
  keyArr = [];
  arr2 = [];
  data = [];
  list = [];
  PicUrl;
  ProfilePic: any
  countComment;
  name;
  url;
  username;
  emailComposer;
  email;
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello StreetartzProvider Provider');
    // this.getuserstate();

  }
  logout() {
    const loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'signing out....',
      duration: 3000
    });
    loader.present();
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve()
      }, (error) => {
        reject(error)

      });
    });

  }

  presentToast1() {
    const toast = this.toastCtrl.create({
      message: 'email or password doesnot match!',
      duration: 3000
    });
  }
  register(obj: obj) {
    return firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then((newUser) => {
      firebase.auth().signInWithEmailAndPassword(obj.email, obj.password).then((authenticatedUser) => {
        var user = firebase.auth().currentUser
        firebase.database().ref("profiles/" + user.uid).set({
          name: obj.name,
          email: obj.email,
          password: obj.password,
          skill: "",
          contact: "",
          downloadurl: '../../assets/download.png',
          bio: "You have not yet inserted a description about your skills and abilities, update profile to get started.",
        })
      })
    }).catch((error) => {
      const alert = this.alertCtrl.create({
        title: error.code,
        subTitle: error.message,
        buttons: [
          {
            text: 'ok',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
      console.log(error);
    })

  }
  checkstate(){
    return new Promise((resolve, reject)=>{
    firebase.auth().onAuthStateChanged((user)=>
     {
      if (user != null) {
       // alert('user signed in')
       this.condition = 1
 
      } else {
 
        this.condition = 0
       // alert('no user signed in')
      }
      resolve(this.condition)
    })
 
  })
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then((data) => {
        if (data) {
          console.log("logged in")
        } else {
          console.log("not logged in");


        }
        resolve();


        return firebase.auth().signInWithEmailAndPassword(email, password);
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          title: error.code,
          subTitle: error.message,
          buttons: [
            {
              text: 'ok',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
        console.log(error);
      })
    })
  }
  profile(obj: obj) {
    this.arr.length = 0;
    return new Promise((pass, fail) => {
      let userID = firebase.auth().currentUser;
      firebase.database().ref("profiles/" + userID.uid).on('value', (data: any) => {
        let username = data.val();
        this.arr.push(username);
      });
      pass(this.arr);
    })

  }
  forgotpassword(email) {
    return new Promise((resolve, reject) => {
      if (email != null) {
        const alert = this.alertCtrl.create({
          title: 'Forgot your?',
          subTitle: 'Please check your Email.',
          buttons: ['OK']
        });
        alert.present();

        firebase.auth().sendPasswordResetEmail(email);
        resolve()



      }
      else if (email == undefined || email == null) {
        const alert = this.alertCtrl.create({
          title: 'Forgot your?',
          subTitle: 'Please enter your Email.',
          buttons: ['OK']
        });
        alert.present();
      }


    })
  }
  uploadPic(pic, name) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });
    const toast = this.toastCtrl.create({
      message: 'Ur image has been added!',
      duration: 3000
    });
    return new Promise((accpt, rejc) => {
      loading.present();
      firebase.storage().ref(name).putString(pic, 'data_url').then(() => {
        accpt(name);
        toast.present();
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  storeToDB(name, category, picName, description) {
    return new Promise((accpt, rejc) => {
      var storageRef = firebase.storage().ref(name);
      storageRef.getDownloadURL().then(url => {
        var user = firebase.auth().currentUser;
        var link = url;
        firebase.database().ref('uploads/').push({
          downloadurl: link,
          name: picName,
          category: category,
          uid: user.uid,
          description: description,
          comments : 0,
          likes : 0
          
        });
        accpt('success');
      }, Error => {
        rejc(Error.message);
        console.log(Error.message);
      });
    })
  }
  viewPicGallery() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });
    return new Promise((accpt, rejc) => {
      loading.present();
      var user = firebase.auth().currentUser
      firebase.database().ref("uploads").on("value", (data: any) => {
        var a = data.val();
        if (a !== null) {

        }
        accpt(a);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  getUserID() {
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("uploads").on("value", (data: any) => {
        var a = data.val();
        if (a !== null) {

        }
        accpt(user.uid);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  uploadProfilePic(pic, name) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });

    const toast = this.toastCtrl.create({
      message: 'picture was uploaded',
      duration: 3000
    });
    return new Promise((accpt, rejc) => {
      loading.present();
      firebase.storage().ref(name).putString(pic, 'data_url').then(() => {
        accpt(name);
        toast.present();
      }, Error => {
        rejc(Error.message)
      })
    })
  }

  storeToDB1(name) {
    this.arr.length = 0;
    return new Promise((accpt, rejc) => {
      this.arr.length = 0;
      var storageRef = firebase.storage().ref(name);
      storageRef.getDownloadURL().then(url => {
        var user = firebase.auth().currentUser;
        var link = url;
        firebase.database().ref('profiles/' + user.uid).update({
          downloadurl: link,
        });
        accpt('success');
      }, Error => {
        rejc(Error.message);
        console.log(Error.message);
      });
    })
  }
  storeImgur(url) {
    this.url = url;
    console.log(url);
  }


  storeName(name) {
    this.obj.name = name;
    console.log(this.obj.name);
  }
  viewPicGallery1() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });
    return new Promise((accpt, rejc) => {
      loading.present();
      var user = firebase.auth().currentUser
      firebase.database().ref("profiles").on("value", (data: any) => {
        var b = data.val();
        var keys = Object.keys(b);
        if (b !== null) {
        }
        this.storeImgur(b[keys[0]].downloadurl);
        accpt(b);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  getUserID1() {
    return new Promise((accpt, rejc) => {
      var userID = firebase.auth().currentUser
      firebase.database().ref("profiles").on("value", (data: any) => {
        var b = data.val();
        if (b !== null) {

        }
        accpt(userID.uid);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  // selectCategory(category) {
  //   return new Promise((pass, fail) => {
  //     firebase.database().ref("uploads").on('value', (data: any) => {
  //       let uploads = data.val();
  //       console.log(uploads);
  //       var keys: any = Object.keys(uploads);
  //       for (var j = 0; j < keys.length; j++) {
  //         firebase.database().ref("uploads").on('value', (data2: any) => {
  //           let uploads2 = data2.val();
  //           console.log(uploads2);
  //           var keys2: any = Object.keys(uploads2);
  //           for (var i = 0; i < keys2.length; i++) {
  //             var k = keys2[i];
  //             if (category == uploads2[k].category) {
  //               let objt = {
  //                 name: uploads2[k].name,
  //                 category: uploads2[k].category,
  //                 downloadurl: uploads2[k].downloadurl
  //               }
  //               this.arr.push(objt);
  //               console.log(this.arr);
  //             }
  //           }
  //         }), pass(this.arr);
  //       }
  //     })
  //   })
  // }
  update(name, contact, bio, skill, email) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });
    const toast = this.toastCtrl.create({
      message: 'data has been updated!',
      duration: 3000
    });
    loading.present();
    return new Promise((pass, fail) => {
      var user = firebase.auth().currentUser
      firebase.database().ref('profiles/' + user.uid).update({
        name: name,
        email:email,
        skill: skill,
        contact:contact,
        bio:bio
      });
      toast.present();
    })


  
  }

  // push(obj: obj) {
  //   return new Promise((pass, fail) => {
  //     firebase.database().ref("uploads").on('value', (data: any) => {
  //       let uploads = data.val();
  //       console.log(uploads);
  //       var keys: any = Object.keys(uploads);
  //       for (var j = 0; j < keys.length; j++) {
  //         firebase.database().ref("uploads").on('value', (data2: any) => {
  //           let uploads2 = data2.val();
  //           console.log(uploads2);
  //           var keys2: any = Object.keys(uploads2);
  //           for (var i = 0; i < keys2.length; i++) {
  //             var k = keys2[i];
  //             if (this.arr == uploads2[k].arr) {
  //               let objt = {
  //                 name: uploads2[k].name,
  //                 //category: uploads2[k].category,
  //                 downloadurl: uploads2[k].downloadurl
  //               }
  //               this.arr.push(objt);
  //               console.log(this.arr);
  //             }
  //           }
  //         }), pass(this.arr);
  //       }
  //     })
  //   })
  // }
  push(obj: obj) {

    return new Promise((pass, fail) => {
      firebase.database().ref("uploads").on('value', (data: any) => {
        let uploads = data.val();
        if (data == null) {

        }
        else {
          var keys: any = Object.keys(uploads);
          for (var j = 0; j < keys.length; j++) {
            firebase.database().ref("uploads").on('value', (data2: any) => {
              let uploads2 = data2.val();
              var keys2: any = Object.keys(uploads2);
              for (var i = 0; i < keys2.length; i++) {
                var k = keys2[i];
                var chckId = data[k].uid;
                if (this.arr == uploads2[k].arr) {
                  let obj = {
                    name: uploads2[k].name,
                    key: keys2,
                    downloadurl: uploads2[k].downloadurl,
                    url: uploads2[k].downloadurl,
                    comments: data[k].comments,
                    description: data[k].description,
                    email:data[k].email
                  }
                  this.arr.push(obj);

                  this.viewProfileMain(chckId).then((profileData: any) => {
                    obj.email = profileData.email
                  
                    // this.arr2.push(obj);
                  });
                }

             
                pass(this.arr);
              }

              this.storeImgur(data[keys2[0]].downloadurl);
            }), pass(this.arr);
          }
        }
      })
    })
  }
  viewPicMain(name, username) {
    this.arr.length = 0;
    return new Promise((accpt, rejc) => {
      firebase.database().ref("uploads").on("value", (data: any) => {
        var data = data.val();
        if (data == null) {
          this.arr2 = null;
          const alert = this.alertCtrl.create({
            subTitle: 'No pictures are uploaded yet',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          var keys1: any = Object.keys(data);
          for (var i = 0; i < keys1.length; i++) {
            var keys1: any = Object.keys(data);
            var k = keys1[i];
            var chckId = data[k].uid;
            console.log(k + " " + data[k].name)

            let obj = {
              uid: data[k].uid,
              category: data[k].category,
              comments: data[k].comments,
              downloadurl: data[k].downloadurl,
              likes :data[k].likes,
              name: data[k].name,
              username: "",
              email: "",
              key: k,
              url: this.url,
              
              
            }
            this.arr2.push(obj);
            this.viewProfileMain(chckId).then((profileData: any) => {
              obj.username = profileData.name
              obj.email = profileData.email
              obj.url = profileData.downloadurl
          
            });
            accpt(this.arr2);
            this.storeImgur(data[keys1[0]].downloadurl);
          }
        }
      }, Error => {
        rejc(Error.message)
      })
    })
  }

  viewProfileMain(userid: string) {
    return new Promise((accpt, rejc) => {
      firebase.database().ref("profiles/" + userid).on("value", (data: any) => {
        var a = data.val();
        accpt(a);
      }, Error => {
        rejc(Error.message)
      })
    })
  }

  comments(key: any, comment: any) {
    var user = firebase.auth().currentUser;
    return new Promise((accpt, rejc) => {
      var day = moment().format('MMMM Do YYYY, h:mm:ss a');
      firebase.database().ref('comments/' + key).push({
        comment: comment,
        uid: user.uid,
        date : day,
        url: this.url
      })
      accpt('success');
    });

  }
  viewComments(key: any, comment: string) {
    this.keyArr.length = 0;
    return new Promise((accpt, rejc) => {
      var day = moment().format('MMMM Do YYYY, h:mm:ss a');
      var user = firebase.auth().currentUser
      firebase.database().ref("comments/" + key).on("value", (data: any) => {
        var CommentDetails = data.val();
        var keys1: any = Object.keys(CommentDetails);
        for (var i = 0; i < keys1.length; i++) {
          var key = keys1[i];
          var chckId = CommentDetails[key].uid;
          let obj = {
            comment: CommentDetails[key].comment,
            uid: user.uid,
            url: this.url,
            date : day,
            username: ""
          }
          // this.keyArr.push(obj);
          // console.log(this.url)
          accpt(this.keyArr);
          this.viewProfileMain(chckId).then((profileData: any) => {
            obj.url = profileData.downloadurl
            obj.username = profileData.name
            this.keyArr.push(obj);
          });
        }
      }, Error => {
        rejc(Error.message)
      })

    })
  }
  addNumComments(key, numComments){
    var num =  numComments  + 1;
    firebase.database().ref('uploads/'+ key).update({comments: num});
    console.log("comment number added");
  }


  viewLikes(key, viewLikes) {
    this.keyArr.length = 0;
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("likes/" + key).on("value", (data: any) => {
        var like = data.val();
        var keys1: any = Object.keys(like);
        console.log(like);
        for (var i = 0; i < keys1.length; i++) {
          var key = keys1[i];
          var chckId = like[key].uid;
          let obj = {
            likes: like[key].likes,
            uid: user.uid,
          }
          this.keyArr.push(obj);
          console.log(this.keyArr)
         accpt(this.keyArr); 
        }
      }, Error => {
        rejc(Error.message)
      })

    })
  }
 
  likePic(key) {
    var user = firebase.auth().currentUser;
    return new Promise((accpt, rejc) => {
      firebase.database().ref('likes/' + key).push(
        //Add like information like user_id
        {
          user_id: firebase.auth().currentUser.uid
        }
      )
      accpt('success');
    });

  }
  addNumOfLikes(key, num){
    num =  num  + 1;
    return new Promise ((accpt, rej) =>{
      firebase.database().ref('uploads/' + key).update({likes: num});
      accpt('like added')
    })
  }
  
  removeLike(key, num){
    num =  num  - 1;
    return new Promise ((accpt, rej) =>{
      this.database.ref('uploads/' + key).push({likes: num});
      this.database.ref('likes/' + key).remove();
      accpt('like removed')
    })
  }

  comLikes(key) {
    var user = firebase.auth().currentUser;
    return new Promise((accpt, rejc) => {
      firebase.database().ref('comlikes/' + key).push(
        //Add like information like user_id
        {
          user_id: firebase.auth().currentUser.uid
        }
      )
      accpt('success');
    });

  }

}






// likePic(key) {
//var user = firebase.auth().currentUser;
//return new Promise((accpt, rejc) => {
//  firebase.database().ref('likes/' + key).child(firebase.auth().currentUser.uid).push(
//    //Add like information like user_id
//    {
//      timestamp : new Date(),
//    
//    }
//  )
//  accpt('success');








