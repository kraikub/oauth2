import { FC } from "react";
import { SimpleFadeInLeft } from "../../../components/animations/SimpleFadeInLeft";
import { SimpleFadeInRight } from "../../../components/animations/SimpleFadeInRight";

interface PageWrapperProps {
  lastPage: number;
  page: number;
  children?: any;
}

export const PageWrapper: FC<PageWrapperProps> = (props) => {
  return props.lastPage > props.page ? (
    <SimpleFadeInLeft>{props.children}</SimpleFadeInLeft>
  ) : (
    <SimpleFadeInRight>{props.children}</SimpleFadeInRight>
  );
};
