import { FC } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

interface SimpleFadeInProps {
  children: any;
  delay?: number;
}

export const SimpleFadeInRight: FC<SimpleFadeInProps> = ({ children, delay }) => {
  return (
    <AnimationOnScroll
      animateIn="animate__fadeInRight"
      animateOnce
      delay={delay ? delay*1000 : 0}
      duration={0.2}
    >
      {children}
    </AnimationOnScroll>
  );
};