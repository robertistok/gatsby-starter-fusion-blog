import React from "react";
import styled from "styled-components";
import { Link, graphql } from "gatsby";
import Image, { FixedObject } from "gatsby-image";
import { GatsbyLocation } from "local-types";

import { rhythm } from "../../../../../utils/typography";
import { device } from "../../../../../styles/constants";

interface ShowcasedPostCardProps {
  title: string;
  slug: string;
  cover?: FixedObject;
  description: string;
  date: string;
  timeToRead: number;
  location: GatsbyLocation;
}

const ShowcasedPostCard: React.FunctionComponent<ShowcasedPostCardProps> = ({
  title,
  slug,
  cover,
  description,
  date,
  timeToRead,
  location,
}): React.ReactElement => (
  <Root>
    <Link
      aria-label={`Continue reading: ${title}`}
      to={`/blog${slug}`}
      state={{ prevPath: location.pathname }}
    >
      <Title>{title}</Title>
      <Cover fixed={cover} />
    </Link>

    <ContentInfo>
      {date} · {timeToRead} min read
    </ContentInfo>

    <Content
      dangerouslySetInnerHTML={{
        __html: description.slice(0, 160),
      }}
    />
  </Root>
);

const Root = styled.section`
  margin-bottom: ${rhythm(0.5)};
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.03);
  }

  a {
    box-shadow: none;
  }

  @media ${device.tablet} {
    margin-bottom: ${rhythm(1)};
  }
`;

const Title = styled.h4`
  margin: ${rhythm(0.4)} 0 ${rhythm(0.4)};
  color: ${({ theme }) => theme.colors.accent};

  @media ${device.tablet} {
    height: ${rhythm(2)};
    margin: ${rhythm(1.25)} 0 ${rhythm(0.1)};
  }
`;

const ContentInfo = styled.span`
  font-style: italic;
  font-size: ${rhythm(0.55)};
  display: block;
`;

const Content = styled.p`
  margin: ${rhythm(2 / 6)} 0;

  @media ${device.tablet} {
    max-height: ${rhythm(5)};
  }
`;

const Cover = styled(Image)`
  width: 100% !important;
  height: 150px !important;

  @media ${device.tablet} {
    height: 100px !important;
    display: block !important;
    margin-bottom: 2px;
  }
`;

export const query = graphql`
  fragment ShowcasedPostInformation on MarkdownRemark {
    excerpt
    fields {
      slug
    }
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
      featured
      description
      cover {
        childImageSharp {
          fixed(height: 512) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    timeToRead
  }
`;

export default ShowcasedPostCard;
