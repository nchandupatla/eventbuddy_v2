export namespace AuthConfig {
  //Auth Configuration.
  //Set to your Firebase app, you can find your credentials on Firebase app console -> Add Web App.
  
  export const firebaseConfig = {
    apiKey: "AIzaSyBUPmQS8s_RRlrmB61ApMJqwrzhP4Zt6-o",
    authDomain: "eventbuddy-de943.firebaseapp.com",
    databaseURL: "https://eventbuddy-de943.firebaseio.com",
    projectId: "eventbuddy-de943",
    storageBucket: "eventbuddy-de943.appspot.com",
    messagingSenderId: "144965795048"
  };
  //You can find your googleWebClientId on your Firebase app console -> Authentication -> Sign-in Method -> Google -> Web client ID
  export const googleWebClientId: string = '144965795048-cf9qgur4iujpmdh046tdkba2gd6u3h5n.apps.googleusercontent.com';
  //Set to true if you want to enable email verifications.
  export const emailVerification: boolean = true;
}
