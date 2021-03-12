const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyAw-rvUD5wXebiYw7LqLB6_PI8hlIU4MSo",
  authDomain: "kiei-451-ay.firebaseapp.com",
  projectId: "kiei-451-ay",
  storageBucket: "kiei-451-ay.appspot.com",
  messagingSenderId: "136512531140",
  appId: "1:136512531140:web:438f5b5790df4b7ccef791"  
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase