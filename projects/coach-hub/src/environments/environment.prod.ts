import { EnvironmentInterface } from './environment.interface';

export let environment: Partial<EnvironmentInterface> = {
  production: true,
  hmr: false,
  app_name: 'Coach Hub',
  url: 'https://coachhub.com',
  ws_url: 'https://coachhub.com',
};

environment.assets_url = environment.url + '/coach-hub/assets';
environment.api_url = environment.url + '/api';
environment.ws_script = environment.ws_url + '/socket.io/socket.io.js';
