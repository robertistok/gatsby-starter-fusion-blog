import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GatsbyLocation } from "local-types";

import Header, { HeaderProps } from "./Header";
import Footer from "./Footer";
import "../../styles/global.css";

import { rhythm } from "../../utils/typography";
import { device, colors } from "../../styles/constants";

interface LayoutProps {
  location?: GatsbyLocation;
  title?: string;
  headerProps?: HeaderProps;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  headerProps,
  location,
}): React.ReactElement => {
  const resizeHeaderOnScroll = (): void => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const shrinkOn = 75;

    const headerEl = document.getElementById("header-root");

    if (headerEl) {
      if (distanceY > shrinkOn) {
        headerEl.classList.add("smaller");
      } else {
        headerEl.classList.remove("smaller");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  });

  return (
    <ThemeProvider theme={{ colors, device }}>
      <Root>
        <Header location={location} {...headerProps} />
        <Main>{children}</Main>
        <Footer />
      </Root>
    </ThemeProvider>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100vh;
  background: #fafafa;
  padding: ${rhythm(3 / 4 + 3)} ${rhythm(3 / 4)} ${rhythm(3 / 4)};

  @media ${device.tablet} {
    padding: ${rhythm(4.5)} ${rhythm(3 / 4)} ${rhythm(1.5)};
  }
`;

const Main = styled.main`
  margin: 0 auto;
  max-width: ${rhythm(42)};
  height: calc(100% - 30px - ${rhythm(1.5)});
  flex: 1 0 auto;
  width: 100%;
`;

export default Layout;
