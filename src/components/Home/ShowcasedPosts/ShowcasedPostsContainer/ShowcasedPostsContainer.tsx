import React from "react";
import styled from "styled-components";
import { FixedObject } from "gatsby-image";
import { GatsbyLocation } from "local-types";
import { MarkdownRemarkEdge } from "graphql-types";

import ShowcasedPostCard from "./ShowcasedPostCard";

import { device } from "../../../../styles/constants";
import { rhythm } from "../../../../utils/typography";

interface ShowcasedPostsContainerProps {
  location: GatsbyLocation;
  title: string;
  posts: MarkdownRemarkEdge[];
}

const ShowcasedPostsContainer: React.FunctionComponent<
  ShowcasedPostsContainerProps
> = ({ location, title, posts }): React.ReactElement => (
  <Root>
    <Title aria-label={`${title} posts section`}>{title}</Title>

    <PostsContainer>
      {posts.map(
        (post): React.ReactElement => (
          <ShowcasedPostCard
            key={post.node.fields.slug}
            title={post.node.frontmatter.title}
            description={post.node.frontmatter.description}
            date={post.node.frontmatter.date}
            slug={post.node.fields.slug}
            cover={
              post.node.frontmatter.cover.childImageSharp.fixed as FixedObject
            }
            timeToRead={post.node.timeToRead}
            location={location}
          />
        )
      )}
    </PostsContainer>
  </Root>
);

const Root = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: ${rhythm(1)};

  @media ${device.tablet} {
  }
`;

const Title = styled.h2`
  margin: 0;
  margin: ${rhythm(0.5)} 0;

  @media ${device.tablet} {
    margin: 0;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: none;
  justify-content: center;

  @media ${device.tablet} {
    grid-template-rows: minmax(100px, 100%);
    grid-template-columns: repeat(3, 31%);
    grid-gap: 3.5%;
  }
`;

export default ShowcasedPostsContainer;
