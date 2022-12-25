import Link from "next/link";
import { FC } from "react";

interface LinkWrapProps {
  href?: string;
  children?: any;
}

export const LinkWrap: FC<LinkWrapProps> = (props) => {
  if (!props.href) {
    return props.children;
  }

  return (
    <Link href={props.href}>
      <a>{props.children}</a>
    </Link>
  );
};
