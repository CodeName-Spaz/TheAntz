

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { obj } from '../../app/class';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { CategoryPage } from '../../pages/category/category';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';

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

  getuserstate(email, password) {


    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {


        if (email != null) {
          this.arr = 1;
          console.log(email)
          //this.rootpage=CategoryPage
          // User is signed in.
        } else {
          // No user is signed in.
          this.arr = 1;
          console.log(email)
          //this.rootPage = LoginPage;
        }



        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

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
        console.log(this.arr);
      });
      pass(this.arr);
    })

  }
  forgotpassword(email) {
    console.log(email)
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
        console.log(url)
        var user = firebase.auth().currentUser;
        var link = url;
        firebase.database().ref('uploads/').push({
          downloadurl: link,
          name: picName,
          category: category,
          uid: user.uid,
          description: description
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
        console.log(a);
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
        console.log(url)
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
        console.log(b[keys[0]].downloadurl);
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
        console.log(b);
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
        contact: contact,
        skill: skill,
        bio: bio,
        email: email
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
              console.log(uploads2);
              var keys2: any = Object.keys(uploads2);
              for (var i = 0; i < keys2.length; i++) {
                var k = keys2[i];
                if (this.arr == uploads2[k].arr) {
                  let objt = {
                    name: uploads2[k].name,
                    key: keys2,
                    downloadurl: uploads2[k].downloadurl,
                    url: uploads2[k].downloadurl
                  }
                  this.arr.push(objt);
                  console.log(this.arr);
                }
              }

              this.storeImgur(data[keys2[0]].downloadurl);
              console.log(data[keys2[0]].downloadurl);
            }), pass(this.arr);
          }
        }
      })
    })
  }
  viewPicMain(name, username) {
    this.arr2.length = 0;
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
          console.log(keys1.length);
          for (var i = 0; i < keys1.length; i++) {
            var keys1: any = Object.keys(data);
            var k = keys1[i];
            var chckId = data[k].uid;

            let obj = {
              uid: data[k].uid,
              category: data[k].category,
              downloadurl: data[k].downloadurl,
              name: data[k].name,
              username: "",
              email: "",
              key: k,
              url: this.url
            }
            this.arr2.push(obj);
            this.viewProfileMain(chckId).then((profileData: any) => {
              obj.username = profileData.name
              obj.email = profileData.email
              obj.url = profileData.downloadurl
          
            });
            accpt(this.arr2);
            console.log(this.arr2);
            this.storeImgur(data[keys1[0]].downloadurl);
            console.log(data[keys1[0]].downloadurl);
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
      firebase.database().ref('comments/' + key).push({
        comment: comment,
        uid: user.uid,
        url: this.url
      })
      accpt('success');
    });

  }
  viewComments(key: any, comment: string) {
    this.keyArr.length = 0;
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("comments/" + key).on("value", (data: any) => {
        var CommentDetails = data.val();
        var keys1: any = Object.keys(CommentDetails);
        console.log(CommentDetails);
        for (var i = 0; i < keys1.length; i++) {
          var key = keys1[i];
          var chckId = CommentDetails[key].uid;
          let obj = {
            comment: CommentDetails[key].comment,
            uid: user.uid,
            url: this.url,
            username: ""
          }
          // this.keyArr.push(obj);
          // console.log(this.url)
          accpt(this.keyArr);
          this.viewProfileMain(chckId).then((profileData: any) => {
            obj.url = profileData.downloadurl
            obj.username = profileData.name
            this.keyArr.push(obj);
            console.log(this.keyArr);
          });
        }
      }, Error => {
        rejc(Error.message)
      })

    })
  }
  countComments(key: string) {
    return new Promise((accpt, rejc) => {
      firebase.database().ref("comments/" + key).on("value", (data: any) => {
        var a = data.val();
        var keys1: any = Object.keys(data);
        for (var i = 0; i < keys1.length; i++) {
          var x = keys1[i];
          console.log(data[x].picID);
          console.log(key);
          if (data[x].picID == key) {
            this.countComment += 1;
          }
        }
        console.log(this.countComment);
        accpt(this.countComment);
      }, Error => {
        rejc(Error.message)
      })
    })
  }

  // likePic(key: any) {
  //   var user = firebase.auth().currentUser;
  //   return new Promise((accpt, rejc) => {
  //     firebase.database().ref('likes/' + key).push({
  //       uid: user.uid,

  //     });

  //   })
  // }

  // // viewLikes(key: string) {
  // //   this.list = [];

  // //   return new Promise((accpt, rejc) => {
  // //     firebase.database().ref("likes/").on("value", (data: any) => {
  // //       var a = data.val();
  // //       var user = firebase.auth().currentUser;
  // //       if (a == null) {
  // //         firebase.database().ref('likes/' + user.uid).push({
  // //           picID: key,
  // //           uid: user.uid
  // //         });
  // //       } else {

  // //         var keys1: any = Object.keys(data);
  // //         for (var i = 0; i < keys1.length; i++) {
  // //           var k = keys1[i];
  // //           let obj = {

  // //             picID: data[k].picID,
  // //             uid: data[k].uid,
  // //             key: k
  // //           }
  // //           this.list.push(obj);
  // //         }

  // //         for (var x = 0; x < this.list.length; x++) {
  // //           if (this.list[x].uid == user.uid && this.list[x].uid == user.uid) {
  // //             firebase.database().ref("uploads/" + user.uid).child(key).remove().then(() => {
  // //             })
  // //           }
  // //         }



  // //       }
  // //     })
  // //   })
  // // }
  // //    likePic(){
  // //   var user = firebase.auth().currentUser;
  // //   console.log(user.uid)
  // //   this.art.likePic(this.key).then((data: any) =>{

  // //     console.log(data);
  // //   });
  // // }

  // likes(key){
  //   return new Promise ((accpt, rej) =>{
  //   firebase.auth().currentUser
  //     this.firebase.ref('likes/' + key ).push({
        
  //       username : this.currentUserID
  //     })
  //     accpt('liked')
  //   })
  
  // }
  
  // addNumOfLikes(username, key, num){
  //   num =  num  + 1;
  //   return new Promise ((accpt, rej) =>{
  //     this.database.ref('uploads/' + username + '/' + key).update({likes: num});
  //     accpt('like added')
  //   })
  // }
  
  // removeLike(username, key, num){
  //   num =  num  - 1;
  //   return new Promise ((accpt, rej) =>{
  //     this.database.ref('uploads/' + username + '/' + key).update({likes: num});
  //     this.database.ref('likes/' + key).remove();
  //     accpt('like removed')
  //   })
  // }
  // likesPic(key, likes: any) {
  //   var user = firebase.auth().currentUser;
  //   return new Promise((accpt, rejc) => {
  //     firebase.database().ref('likes/' + key).push({
  //       likes: likes,
  //       uid: user.uid,
  //       url: this.url
  //     })
  //     accpt('success');
  //   });

  // }
  // addNumlikes(key, numLikes){
  //   var num =  numLikes  + 1;
  //   firebase.database().ref('likes/'+ key).update({likes: num});
  //   console.log("likes number added");
  // }


  likes(key: any) {
    var user = firebase.auth().currentUser;
    return new Promise((accpt, rejc) => {
      firebase.database().ref('likes/' + key).push({
        uid: user.uid,
      })
      accpt('success');
    });
  }

  addNumlikes(key, numLikes,num) {
    return new Promise ((accpt, rej) =>{
      firebase.database().ref('uploads/' + '/' +key).update({ likes: num }).then(res => {
        var num = numLikes + 1;
        console.log(num);
      });
      accpt('like added')
  })
  
  }

}













