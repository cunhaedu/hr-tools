import React from "react";
import Lottie, { Options } from "react-lottie";

interface LottieAnimationProps {
  lotti: any;
  width: number;
  height: number;
}

export default function LottieAnimation({ lotti, width, height }: LottieAnimationProps) {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
}
