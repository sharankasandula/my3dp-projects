// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBSyXeSfLruO0eD9EFtKTSyaqyyNt8iWTc',
    authDomain: 'my3dprints-f727e.firebaseapp.com',
    projectId: 'my3dprints-f727e',
    storageBucket: 'my3dprints-f727e.appspot.com',
    messagingSenderId: '16001692881',
    appId: '1:16001692881:web:b663d1a7d69073636201f0'
  },
  SCRAPER_ENDPOINT: 'http://localhost:8000/thingiverse',
  NGX_GALLERY_CONFIG: {
        thumbnailsColumns: 4,
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewZoom: true,
        previewRotate: true,
        image: false,
        thumbnailsRemainingCount: true,
        width: 'auto',
        height: 'auto',
        breakpoint: 500,
        imageArrowsAutoHide: true,
        thumbnailsArrowsAutoHide: true,
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        preview: true,
      },
  }
;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
