import { triggerHaptic } from '@/utils/nativeBridge';

interface HapticWrapperProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}

const HapticWrapper = ({ children, onClick }: HapticWrapperProps) => {

  const handleClick = (event: React.MouseEvent) => {
    triggerHaptic();
    if (!onClick) return;
    onClick(event);
  };
  return <div onClick={handleClick}>{children}</div>;
};

export default HapticWrapper;