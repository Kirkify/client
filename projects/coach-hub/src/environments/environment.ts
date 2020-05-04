// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentInterface } from './environment.interface';

export let environment: Partial<EnvironmentInterface> = {
  production: false,
  hmr: false,
  is_docker: false,
  app_name: 'Coach Hub',
  x_debug_key: '19796',
  url: 'http://localhost:4200',
  dev_url: 'http://homestead.test'
};

environment.assets_url = environment.url + '/assets';
environment.ws_url = environment.is_docker ? (environment.url + '/ws') : 'http://homestead.test';
environment.api_url = '/api';
environment.ws_script = environment.ws_url + '/socket.io/socket.io.js';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
