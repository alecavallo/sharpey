// eslint-disable-next-line @typescript-eslint/no-var-requires
const firestoreService = require("firestore-export-import");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("./serviceAccount.json");

const databaseURL = "https://sharpey-diabetes.firebaseio.com";

firestoreService.initializeApp(serviceAccount, databaseURL);
firestoreService.restore("data.json");
