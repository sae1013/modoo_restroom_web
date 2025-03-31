export const triggerHaptic = () => {
  if (!window?.ReactNativeWebView) return;
  window.ReactNativeWebView.postMessage('triggerHaptic');
};