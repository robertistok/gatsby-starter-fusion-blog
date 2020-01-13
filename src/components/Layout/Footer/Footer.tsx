import React from "react";
import styled from "styled-components";
import { rhythm, scale } from "../../../utils/typography";

import Social from "../../Social";

const Footer: React.FunctionComponent = (): React.ReactElement => (
  <Root>
    <CTA>Reach out to me on your favorite social :)</CTA>
    <Social className="footer_social" />
    <CopyRight>© 2019 robertistok</CopyRight>
  </Root>
);

const Root = styled.footer`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;

  margin: 0 auto;
  color: rgba(0, 0, 0, 0.6);
  ${scale(-0.5)};

  &:before {
    margin: ${rhythm(2)} auto ${rhythm(1)};
    content: "";
    width: 100%;
    max-width: ${rhythm(42)};
    border-bottom: 1px solid #ccc;
    display: block;
    position: relative;
  }

  .footer_social {
    align-self: center;
    grid-gap: 5px;
    grid-template-columns: repeat(6, ${rhythm(1)});

    svg {
      width: ${rhythm(1)};
      height: ${rhythm(1)};
    }
  }
`;

const CTA = styled.span`
  color: rgba(0, 0, 0, 1);
  margin-bottom: ${rhythm(0.125)};
`;

const CopyRight = styled.span`
  margin: ${rhythm(0.5)} 0;
`;

export default Footer;
