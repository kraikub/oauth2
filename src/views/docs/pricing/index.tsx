import { GetStaticProps } from "next";
import { promises } from 'fs';
import { FC } from "react";


export const getStaticProps: GetStaticProps = async (context) => {
  console.log("getStaticProps")
  const file = await promises.readFile(__dirname+'/../../../src/views/docs/pricing/pricing.md', "utf-8");
  console.log(file)
  return {
    props: {
      markdownContent: file
    }
  }
}

export const Pricing: FC<MarkdownBaseProps> = ({ markdownContent }) => {
  return (
    <>{markdownContent}</>
  )
}