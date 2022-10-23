import { FC } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

interface SimpleFadeInProps {
  children: any;
  delay?: number;
}

export const SimpleFadeInLeft: FC<SimpleFadeInProps> = ({ children, delay }) => {
  return (
    <AnimationOnScroll
      animateIn="animate__fadeInLeft"
      animateOnce
      delay={delay ? delay*1000 : 0}
      duration={0.2}
    >
      {children}
    </AnimationOnScroll>
  );
};