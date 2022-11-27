import firebase from "firebase";
const config = {
  apiKey: "AIzaSyDUYQnDzzIG5q2WHTeMwtJzl86u6kAQ6kA",
  authDomain: "sharpey-diabetes.firebaseapp.com",
  databaseURL: "https://sharpey-diabetes.firebaseio.com",
  projectId: "sharpey-diabetes",
  storageBucket: "sharpey-diabetes.appspot.com",
  messagingSenderId: "313818026844",
  appId: "1:313818026844:web:b796d68f408c02c7a76799",
};
firebase.initializeApp(config);
export default firebase;
