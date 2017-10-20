export namespace AuthConfig {
  //Auth Configuration.
  //Set to your Firebase app, you can find your credentials on Firebase app console -> Add Web App.
  
  export const firebaseConfig = {
    apiKey: "AIzaSyBKpnTSx2aNi20aEOAK3KXncFaFz_wPJ_o",
    authDomain: "eventbuddy-vamshi.firebaseapp.com",
    databaseURL: "https://eventbuddy-vamshi.firebaseio.com",
    projectId: "eventbuddy-vamshi",
    storageBucket: "eventbuddy-vamshi.appspot.com",
    messagingSenderId: "874634436063"
  };
  //You can find your googleWebClientId on your Firebase app console -> Authentication -> Sign-in Method -> Google -> Web client ID
  export const googleWebClientId: string = '1061295930865-coo09q9fq7acgfvpjstp8pvtf2bpdfj7.apps.googleusercontent.com';
  //Set to true if you want to enable email verifications.
  export const emailVerification: boolean = true;
}
