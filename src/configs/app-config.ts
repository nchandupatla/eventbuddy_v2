import { CloudSettings } from '@ionic/cloud-angular';

export namespace AppConfig {
  //App Configuration.
  //You can set your app configurations here.
  //For the list of config options, please refer to https://ionicframework.com/docs/api/config/Config/
  export const config = {
    mode: 'ios' //Force app to have the iOS look and feel even when on other platforms.
  };
  //Replace app_id with your app_id on https://apps.ionic.io.
  //Make sure to choose the correct Ionic app.
  export const cloudConfig = {
    'core': {
      'app_id': 'a73347e0'
    },
    'push': {
      'sender_id': '249584835712'
    }
  };
  //Get your apiToken on https://apps.ionic.io, under Settings -> API Keys -> New Token -> Show token.
  //Make sure to choose the correct Ionic app.
  //This is needed to authorize this app to send push notifications using Ionic Push.
  export const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmQzZDc0My01YjBhLTQ2OGItOTYwNi05NGJhNzM5N2MzZDQifQ.b9Ici5CP803c9t12lk5Mi7hJMGLV1qnQa5ngaiZFey8';
  //Create a security profile at https://apps.ionic.io, under Settings -> Certificates -> New Security Profile.
  //Edit the profile and upload your APN (iOS) and set your FCM Credentials (Android).
  //Please refer to the documentation on how to setup your APN and FCM Credentials.
  export const pushProfile = 'dev';
  //Default language to use.
  export const defaultLanguage = 'en';
}
