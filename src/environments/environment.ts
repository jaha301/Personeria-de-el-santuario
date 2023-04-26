// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  firebase: {
    projectId: 'personeriadb',
    appId: '1:1086438279644:web:db0a43fd597bd422dc6719',
    databaseURL: 'https://personeriadb-default-rtdb.firebaseio.com',
    storageBucket: 'personeriadb.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyBsv-6DkWPCDbUVGrWoZwsoQEkm7wn3_8A',
    authDomain: 'personeriadb.firebaseapp.com',
    messagingSenderId: '1086438279644',
    measurementId: 'G-R68KRM30D9',
  },
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBsv-6DkWPCDbUVGrWoZwsoQEkm7wn3_8A",
    authDomain: "personeriadb.firebaseapp.com",
    projectId: "personeriadb",
    storageBucket: "personeriadb.appspot.com",
    messagingSenderId: "1086438279644",
    appId: "1:1086438279644:web:db0a43fd597bd422dc6719",
    measurementId: "G-R68KRM30D9"
  }
};

