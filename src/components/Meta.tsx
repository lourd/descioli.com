import React from "react";
import Head from "react-helmet";

interface Props {
  title?: string;
  description?: string;
  keywords: string[];
  image?: string;
  authorHandle: string;
  url?: string;
}
const Meta = (props: Props) => (
  <Head>
    {props.title && <title>{props.title}</title>}
    {props.title && <meta property="og:title" content={props.title} />}
    {props.description && (
      <meta name="description" content={props.description} />
    )}
    {props.description && (
      <meta property="og:description" content={props.description} />
    )}
    {props.keywords.length > 0 && (
      <meta name="keywords" content={props.keywords.join(",")} />
    )}
    <meta name="twitter:creator" content={props.authorHandle} />
    {props.image && (
      <meta property="og:image" content={props.url + props.image} />
    )}
  </Head>
);

Meta.defaultProps = {
  keywords: [],
  // not hard coding these would be nice
  authorHandle: "@louisdescioli",
  url: "https://www.descioli.design"
};

export default Meta;
