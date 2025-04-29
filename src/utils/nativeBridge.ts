import { NATIVE_MSG } from '@/lib/natives/message';


export const triggerHaptic = () => {
  if (!window?.ReactNativeWebView) return;
  window.ReactNativeWebView.postMessage(JSON.stringify({
    command: NATIVE_MSG.TRIGGER_HAPTIC,
  }));
};
