import React from "react";
import styled from "styled-components";
import Image, { FixedObject } from "gatsby-image";

import { SiteSiteMetadataAuthor } from "graphql-types";
import { rhythm } from "../../utils/typography";
import { yearsSince } from "../../utils/timeSince";
import { device } from "../../styles/constants";
import { useAvatar } from "../../hooks";

interface AboutProps {
  author: SiteSiteMetadataAuthor;
}

const About: React.FunctionComponent<AboutProps> = ({
  author,
}): React.ReactElement => {
  const avatar = useAvatar({ width: 200, height: 200 });

  return (
    <Root>
      <Avatar fixed={avatar.childImageSharp.fixed as FixedObject} />

      <Description>
        <h4>Hey there my friend!</h4>
        <p>
          My name is {author.name}, and I am {yearsSince(author.birthDate)}{" "}
          years old. I have a passion for products having constructive effects
          on our lives, and I love to be involved in the development of
          purposeful applications.
        </p>

        <p>
          I contribute to the product life cycle with my comprehensive skills in
          web development, my growing knowledge of behavioral sciences and human
          psychology, and my neverending hunger for growth.
        </p>

        <p>
          When not building stuff, I love to explore, read fascinating books,
          learn languages, write about my experiences in life, have amazing
          dinners and meet interesting people. I am also obsessed with building
          positive habits. I believe they are the keys to unlock our full
          potential.
        </p>

        <p>
          Do you want to find out more about me? Please shoot me an email at{" "}
          <strong>{author.social.email}</strong> or reach out to me on social
          media, listed below.
        </p>
      </Description>
    </Root>
  );
};

const Root = styled.div`
  display: grid;
  grid-gap: ${rhythm(2)};
  margin-top: ${rhythm(0.5)};

  @media ${device.tablet} {
    grid-template-columns: minmax(20%, 200px) 70%;
  }
`;

const Avatar = styled(Image)`
  align-self: center;

  border-radius: 50%;
  width: 150px;
  height: 150px;
  justify-self: center;
  align-self: flex-start;

  @media ${device.tablet} {
    width: auto;
    height: auto;
    justify-self: start;
  }
`;

const Description = styled.section`
  h4 {
    margin-top: ${rhythm(0.5)};
  }
`;

export default About;
