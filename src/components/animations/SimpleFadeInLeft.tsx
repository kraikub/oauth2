import { FC } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

interface SimpleFadeInProps {
  children: any;
  delay?: number;
}

export const SimpleFadeInLeft: FC<SimpleFadeInProps> = ({ children, delay }) => {
  return (
    <AnimationOnScroll
      animateIn="kraikub__animation_fade_in_left"
      animateOnce
      delay={delay ? delay*1000 : 0}
      duration={0.8}
    >
      {children}
    </AnimationOnScroll>
  );
};