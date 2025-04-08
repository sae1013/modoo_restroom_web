import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface Props {
  animationData: any;
  loop?: boolean;
}

const LottieAnimation = ({ animationData, loop = false, ...props }: Props) => {
  return (
    <div {...props}>
      <Lottie animationData={animationData} loop={loop}></Lottie>
    </div>
  );
};

export default LottieAnimation;