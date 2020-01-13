import React from "react";
import styled from "styled-components";
import Image, { FixedObject } from "gatsby-image";
import { Link } from "gatsby";

import { rhythm } from "../../../utils/typography";
import { device } from "../../../styles/constants";
import { useSiteMetadata, useAvatar } from "../../../hooks";

const Author = (): React.ReactElement => {
  const { author } = useSiteMetadata();
  const avatar = useAvatar({ width: 50, height: 50 });

  const avatarFixedImage: FixedObject = {
    ...avatar.childImageSharp.fixed,
    // need to set src and srcSet explicitly, otherwise there is a type conflict
    src: avatar.childImageSharp.fixed.src,
    srcSet: avatar.childImageSharp.fixed.srcSet,
    width: 50,
    height: 50,
  };

  return (
    <Root>
      <StyledImage fixed={avatarFixedImage} alt={author.name} />
      <h5>
        A personal blog by{" "}
        <a href={`https://www.linkedin.com/in/${author.social.linkedin}`}>
          {author.name}
        </a>{" "}
        about coding, traveling, habit building, and much more (Psst... I am{" "}
        <em>
          <Link to="/resume">open to opportunities</Link>.)
        </em>
      </h5>
    </Root>
  );
};

const Root = styled.section`
  display: grid;
  grid-template-columns: 50px auto;
  grid-gap: ${rhythm(1)};
  align-items: center;
  margin-bottom: ${rhythm(1)};

  h5 {
    margin: 0;
    line-height: 1.5;
  }
`;

const StyledImage = styled(Image)`
  margin-bottom: 0;
  justify-self: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  @media ${device.tablet} {
    grid-row: auto;
    justify-self: flex-end;
  }
`;

export default Author;
