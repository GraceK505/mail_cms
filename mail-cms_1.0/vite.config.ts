import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import angular from '@analogjs/vite-plugin-angular';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';


const configPath = path.resolve(process.cwd(), '.config/ngrok/ngrok.yml')

const yamlConfig: any = yaml.load(
  fs.readFileSync(configPath, 'utf8')
);

export default defineConfig({
  plugins: [
    nodePolyfills({
      globals: { process: true },
    })
  ]
});
