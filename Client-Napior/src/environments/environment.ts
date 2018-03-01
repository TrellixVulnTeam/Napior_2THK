// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB95TLYfpyVMHZBTWiBYc-U96ggjl_3W_o",
    authDomain: "napior-firebase.firebaseapp.com",
    databaseURL: "https://napior-firebase.firebaseio.com",
    projectId: "napior-firebase",
    storageBucket: "",
    messagingSenderId: "1068757474109"
  },
  logOutOnExit: false,
  stripeKey: 'pk_test_srCBU6I3eLaNzy6BX2U5m9ur'
};

