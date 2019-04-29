
/* this file need add to "typeRoots"
* as follow :
* https://stackoverflow.com/questions/51876748/custom-typings-files-to-angular-6
*  */

// to tell TS and compile the bluebird are default Promise implement
// need tell zone.js as this :
//    https://github.com/angular/zone.js/blob/master/NON-STANDARD-APIS.md#currently-supported-non-standard-common-apis
// use 'bluebird-global' not 'bluebird' to tell TS, the bluebird is global default Promise
// AND, add "bluebird-global" on tsconfig.app.json "compilerOptions"."types", like:
//    "types": [
//      "bluebird-global"
//    ]
//
import 'zone.js';
import 'bluebird-global';

