import { FC } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

interface SimpleFadeInProps {
  children: any;
  delay?: number;
}

export const SimpleFadeIn: FC<SimpleFadeInProps> = ({ children, delay }) => {
  return (
    <AnimationOnScroll
      animateIn="animate__fadeInDown"
      animateOnce
      delay={delay ? delay*1000 : 0}
      duration={1}
    >
      {children}
    </AnimationOnScroll>
  );
};