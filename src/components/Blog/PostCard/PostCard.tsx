import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { GatsbyLocation } from "local-types";

import { rhythm } from "../../../utils/typography";

interface PostCardProps {
  title: string;
  slug: string;
  description: string;
  date: string;
  timeToRead: number;
  location: GatsbyLocation;
}

const PostCard: React.FunctionComponent<PostCardProps> = ({
  title,
  slug,
  description,
  date,
  timeToRead,
  location,
}): React.ReactElement => (
  <Root>
    <Title>
      <Link
        aria-label={`Continue reading: ${title}`}
        to={`/blog${slug}`}
        state={{ prevPath: location.pathname }}
      >
        {title}
      </Link>
    </Title>
    <ContentInfo>
      {date} · {timeToRead} min read
    </ContentInfo>
    <Content
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  </Root>
);

const Root = styled.section`
  margin-bottom: ${rhythm(1)};

  a {
    box-shadow: none;
  }
`;

const Title = styled.h3`
  margin: ${rhythm(1)} 0 0;
`;

const ContentInfo = styled.span`
  font-style: italic;
  font-size: ${rhythm(0.6)};
`;

const Content = styled.p`
  margin: ${rhythm(2 / 6)} 0;
`;

export default PostCard;
