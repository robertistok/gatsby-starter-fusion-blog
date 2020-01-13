import { useTransition, SpringConfig } from "react-spring";
import { GatsbyLocation } from "local-types";

interface UsePageTransitionProps {
  translateX?: number;
  config?: SpringConfig;
  location?: GatsbyLocation;
}

const usePageTransitions = (props: UsePageTransitionProps = {}) => {
  const { translateX = "100", config, location } = props;

  const transitions = useTransition(location, location => location.pathname, {
    from: {
      opacity: 0.5,
      transform: `translate3d(${translateX}vw, 0, 0)`,
    },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    config: config || { tension: 280, friction: 40 },
  });

  return transitions;
};

export default usePageTransitions;
