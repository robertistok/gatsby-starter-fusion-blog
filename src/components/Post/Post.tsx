import React from "react";
import styled from "styled-components";
import { MarkdownRemark } from "graphql-types";

import Author from "../Layout/Author";

import { rhythm, scale } from "../../utils/typography";

interface PostProps {
  post: MarkdownRemark;
}

const Post: React.FunctionComponent<PostProps> = ({
  post,
}): React.ReactElement => (
  <Root>
    <Title>{post.frontmatter.title}</Title>
    <Info>
      {post.frontmatter.date} · {post.timeToRead} min read
    </Info>
    <Content dangerouslySetInnerHTML={{ __html: post.html }} />
    <div className="separator" />
    <Author />
  </Root>
);

const Root = styled.section`
  margin: auto;
  max-width: ${rhythm(28)};
  ${scale(0.1)}

  .separator {
    margin: 20px 0px;
    border: none;
    text-align: center;
    font-size: ${rhythm(1)};
    font-weight: 300;

    &:before {
      line-height: 1.4;
      text-indent: 0.6em;
      letter-spacing: 0.6em;
      content: "···";
    }
  }
`;

const Title = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`;

const Info = styled.p`
  font-size: ${rhythm(0.6)};
  font-style: italic;
  display: block;
  margin-bottom: ${rhythm(1)};
`;

const Content = styled.article`
  .md-figure-caption,
  .gatsby-resp-image-figcaption {
    text-align: center;
    ${scale(-0.2)};
    font-style: italic;
  }

  .gatsby-resp-image-background-image {
    margin-bottom: ${rhythm(0.1)};
  }

  .video_container {
    iframe {
      width: 100%;
      height: ${rhythm(20)};
      margin-bottom: 0;
    }
  }
`;

export default Post;
