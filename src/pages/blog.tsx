import React from "react";
import { animated } from "react-spring";
import { GatsbyLocation } from "local-types";

import Layout from "../components/Layout";
import Blog from "../components/Blog";
import SEO from "../components/Seo";
import { useSiteMetadata, usePageTransitions } from "../hooks";

interface BlogIndexProps {
  location: GatsbyLocation;
}

const BlogIndex: React.FunctionComponent<BlogIndexProps> = ({
  location,
}): React.ReactElement => {
  const { title: siteTitle } = useSiteMetadata();

  const comingBack =
    location.state && location.state.prevPath
      ? Boolean(location.state.prevPath.match(/\/blog\/*/))
      : false;

  const transitions = usePageTransitions({
    translateX: comingBack ? -100 : 100,
    location,
  });

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Blog" />
      {transitions.map(({ props, key }) => (
        <animated.div key={key} style={props}>
          <Blog location={location} />
        </animated.div>
      ))}
    </Layout>
  );
};

export default BlogIndex;
