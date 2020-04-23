export interface EnvironmentInterface {
  production: boolean;
  hmr: boolean;
  app_name: string;
  is_docker: boolean;
  x_debug_key: string;
  dev_url: string;
  url: string;
  api_url: string;
  ws_url: string;
  ws_script: string;
}

