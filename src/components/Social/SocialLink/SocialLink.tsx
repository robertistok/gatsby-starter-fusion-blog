import React, { useRef } from "react";
import styled from "styled-components";

import { useSocialStateValue } from "../SocialState";
import useOpacityAdjuster from "./hooks/useOpacityAdjuster";

import SOCIALS from "./constants";
import { rhythm } from "../../../utils/typography";

interface SocialLinkProps<T> {
  type: keyof T;
  userId?: string;
  rootProps?: {
    href: string;
  };
}

const SocialLink = React.memo(
  ({ userId, type, rootProps }: SocialLinkProps<typeof SOCIALS>) => {
    const [
      ,
      { setHoveredElement, resetHoveredElement },
    ] = useSocialStateValue();
    const rootEl = useRef(null);
    const { shouldReduceOpacity } = useOpacityAdjuster({ referenceEl: rootEl });

    const { Icon, baseUrl, ...baseRootProps } = SOCIALS[type];

    const handleOnMouseEnter = () => setHoveredElement(rootEl);
    const handleOnMouseLeave = () => resetHoveredElement();

    return (
      <Root
        {...baseRootProps}
        {...(baseUrl && userId && { href: `${baseUrl}/${userId}` })}
        {...rootProps}
        ref={rootEl}
        shouldReduceOpacity={shouldReduceOpacity}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <Icon />
      </Root>
    );
  }
);

SocialLink.displayName = "SocialLink";

const Root = styled.a<{ hoverColor?: string; shouldReduceOpacity: boolean }>`
  color: inherit;
  text-decoration: none;
  box-shadow: none;
  opacity: ${({ shouldReduceOpacity }) => (shouldReduceOpacity ? 0.5 : 1)};
  width: ${rhythm(1.25)};
  height: ${rhythm(1.25)};

  svg {
    transition: transform 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
    width: 100%;
    height: 100%;

    &:hover {
      cursor: pointer;
      transform: scale(1.3);
      color: ${({ hoverColor }) => hoverColor || "initial"};
    }
  }
`;

export default SocialLink;
