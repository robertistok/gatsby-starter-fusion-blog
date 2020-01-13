import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { FaArrowLeft } from "react-icons/fa";
import { GatsbyLocation } from "local-types";

import { rhythm, scale } from "../../../utils/typography";
import { useSiteMetadata } from "../../../hooks";
import { device } from "../../../styles/constants";

export interface HeaderProps {
  showBackNav: boolean;
  location?: GatsbyLocation;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  showBackNav = false,
  location,
}): React.ReactElement => {
  const { author } = useSiteMetadata();

  return (
    <Root id="header-root">
      <StyledHeader>
        <Title>
          <Link
            aria-label={
              showBackNav && location.state && location.state.prevPath
                ? "Back"
                : "Home"
            }
            rel="back"
            to={
              showBackNav && location.state && location.state.prevPath
                ? location.state.prevPath
                : "/"
            }
            state={{ prevPath: location.pathname }}
          >
            {showBackNav ? (
              <FaArrowLeft />
            ) : (
              author.social.twitter.toLowerCase()
            )}
          </Link>
        </Title>
        <StyledNav>
          <StyledLink rel="author" to="/about">
            about
          </StyledLink>
          <StyledLink to="/blog">blog</StyledLink>
        </StyledNav>
      </StyledHeader>
    </Root>
  );
};

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: ${rhythm(3)};
  overflow: hidden;
  background: #fefffe;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: ${rhythm(3 / 4)};
  transition: height 0.5s;

  &.smaller {
    height: ${rhythm(2)};
  }
`;

const StyledHeader = styled.header`
  width: 100%;
  max-width: ${rhythm(42)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  ${scale(0.25)};

  a {
    color: inherit;
    text-decoration: none;
    box-shadow: none;
    display: flex;
  }

  @media ${device.tablet} {
    margin-bottom: 0;
    ${scale(0.5)};
  }
`;

const StyledNav = styled.nav``;

const StyledLink = styled(Link)`
  margin-right: ${rhythm(1 / 2)};
`;

export default Header;
