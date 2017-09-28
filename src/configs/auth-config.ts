export namespace AuthConfig {
  //Auth Configuration.
  //Set to your Firebase app, you can find your credentials on Firebase app console -> Add Web App.
  export const firebaseConfig = {
    apiKey: "AIzaSyBLh7tGkz6Di3piOZN9uuJOTsIpM9Klk2M",
    authDomain: "event-buddy-659b4.firebaseapp.com",
    databaseURL: "https://event-buddy-659b4.firebaseio.com",
    projectId: "event-buddy-659b4",
    storageBucket: "event-buddy-659b4.appspot.com",
    messagingSenderId: "1061295930865"
  };
  //You can find your googleWebClientId on your Firebase app console -> Authentication -> Sign-in Method -> Google -> Web client ID
  export const googleWebClientId: string = '1061295930865-coo09q9fq7acgfvpjstp8pvtf2bpdfj7.apps.googleusercontent.com';
  //Set to true if you want to enable email verifications.
  export const emailVerification: boolean = true;
}
