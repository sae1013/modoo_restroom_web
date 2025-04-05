class NativeMsgService {
  native: any;

  constructor() {
    this.native = window.ReactNativeWebView;
  }

  public sendMessage(msg: string) {
    this.native?.postMessage(msg);
  }

}

export default new NativeMsgService();