// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulator:true,
  firebase : {
    apiKey: "AIzaSyAuD-PD1XTgUvkil5kp3HXi9RCPoIm0mMs",
    authDomain: "petfriends-app-94df7.firebaseapp.com",
    projectId: "petfriends-app-94df7",
    storageBucket: "petfriends-app-94df7.appspot.com",
    messagingSenderId: "863513492581",
    appId: "1:863513492581:web:6e34a0ed10660216899a8c",
    measurementId: "G-TE8JYWD5PT"
  },
  api: {
    createUser: "http://localhost:5001/petfriends-app-94df7/us-central5/createUser"
}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
