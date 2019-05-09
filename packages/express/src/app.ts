import express, { Application } from 'express';
import { Config } from './config';

export class ReactSsrExpress {
  private readonly app: Application;
  private readonly config: Config;

  constructor(config: Config = {}) {
    this.app = express();
    this.config = {
      ...(new Config),
      ...config,
    };

    if (!this.config.engine) {
      throw new Error('InvalidProgramException: view engine must be specified.');
    }

    if (!['jsx', 'tsx'].includes(this.config.engine)) {
      throw new Error(`The engine ${this.config.engine} is not supported.`);
    }

    require(`@react-ssr/express-engine-${this.config.engine}`)(this.app, this.config);

    this.app.listen = this.listen;
  }

  getApp(): Application {
    return this.app;
  }

  listen(port: number, hostname: string, backlog: number, callback?: Function): import('http').Server;
  listen(port: number, hostname: string, callback?: Function): import('http').Server;
  listen(port: number, callback?: Function): import('http').Server;
  listen(path: string, callback?: Function): import('http').Server;
  listen(handle: any, listeningListener?: Function): import('http').Server;
  listen(port: any, hostname?: any, backlog?: any, callback?: any) {
    for (let i = 0; i < this.app._router.stack.length; i++) {
      const r = this.app._router.stack[i];
      console.log(r);
    }
    return this.app.listen(port, hostname, backlog, callback);
  }
}
