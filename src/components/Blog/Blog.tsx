import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyLocation } from "local-types";
import { MarkdownRemarkConnection } from "graphql-types";

import PostCard from "./PostCard";
import Author from "../Layout/Author";
import { rhythm } from "../../utils/typography";

interface BlogProps {
  location: GatsbyLocation;
}

const Blog: React.FunctionComponent<BlogProps> = ({
  location,
}): React.ReactElement => {
  const data: {
    allMarkdownRemark: MarkdownRemarkConnection;
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { eq: false } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
            timeToRead
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.edges;

  return (
    <Root>
      <Author />
      {posts.map(
        ({ node }): React.ReactElement => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <PostCard
              key={node.fields.slug}
              title={title}
              slug={node.fields.slug}
              description={node.frontmatter.description || node.excerpt}
              date={node.frontmatter.date}
              timeToRead={node.timeToRead}
              location={location}
            />
          );
        }
      )}
    </Root>
  );
};

const Root = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: ${rhythm(24)};
`;

export default Blog;
