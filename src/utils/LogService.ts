class LogService {
  logger = null;

  constructor() {
    this.logger = window.ReactNativeWebView;
  }

  log(msg: string) {
    // this.logger.postMessage({ command: '[WEB LOGGER]:' + msg });
  }
}

export default new LogService();
