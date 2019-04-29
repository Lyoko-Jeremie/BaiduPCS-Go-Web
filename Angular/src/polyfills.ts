/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags.ts';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
// https://github.com/angular/zone.js/blob/master/NON-STANDARD-APIS.md#currently-supported-non-standard-common-apis
// to tell zone.js support bluebird
import 'zone.js';
import 'zone.js/dist/zone';  // Included with Angular CLI.
import 'zone.js/dist/long-stack-trace-zone';

// tslint:disable no-string-literal
console.log(window['Promise']);

// https://github.com/angular/zone.js/issues/455#issuecomment-285749589
// https://github.com/angular/zone.js/pull/655
import * as Bluebird from 'bluebird';
Bluebird.config(
  {
    // warnings: false,
    // longStackTraces: false,
    // cancellation: true,
    // monitoring: false
  }
);

import 'zone.js/dist/zone-bluebird';
// tslint:disable no-string-literal
Zone[Zone['__symbol__']('bluebird')](Bluebird);
// console.log(Zone);
console.log(window['Promise']);
// @ts-ignore
console.log(Promise === Bluebird);
// console.log(window['performance']);
// console.log(Zone.assertZonePatched);
// console.log(Zone.assertZonePatched['toSource']());
// https://github.com/angular/zone.js/issues/455#issuecomment-285749589
// tslint:disable only-arrow-functions
Zone.assertZonePatched = function() {
};

import 'zone.js/dist/zone-patch-rxjs';
// import 'zone.js/dist/zone-patch-rxjs-fake-async';


/***************************************************************************************************
 * APPLICATION IMPORTS
 */
