const useNative = () => {
  const nativeWebview = window.ReactNativeWebView;

  const sendMessage = (msg: string) => {
    nativeWebview?.postMessage(msg);
  };

  return [sendMessage];
};

export default useNative;