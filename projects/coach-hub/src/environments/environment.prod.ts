import { EnvironmentInterface } from './environment.interface';

export let environment: Partial<EnvironmentInterface> = {
  production: true,
  hmr: false,
  url: 'http://homestead.test',
  ws_url: 'http://homestead.test:6001',
};

environment.api_url = environment.url + '/api';
