// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userManagerApiUrl: 'http://34.69.232.230:3006',
  chatSocketApiUrl: 'http://34.69.232.230:3007',
  // userManagerApiUrl: 'http://localhost:8080',
  // chatSocketApiUrl: 'http://localhost:8081',
  timeout: 4000,
  retry: 2
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
