import { Injectable, ErrorHandler, Injector } from '@angular/core';
import * as Rollbar from 'rollbar';

@Injectable()
export class RollbarService implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(err: any): void {
    const rollbar = this.injector.get(Rollbar);
    rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  const rollbarConfig = {
    accessToken: '4197f1da0fb6446ea1595bda3ace6925',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };
  return new Rollbar(rollbarConfig);
}
