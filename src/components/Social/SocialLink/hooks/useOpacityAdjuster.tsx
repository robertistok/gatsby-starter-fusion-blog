import { useEffect, useState } from "react";

import { useSocialStateValue } from "../../SocialState";

interface UseOpacityAdjuster {
  referenceEl: React.Ref<JSX.Element>;
}

const useOpacityAdjuster = ({ referenceEl }: UseOpacityAdjuster) => {
  const [shouldReduceOpacity, setShouldReduceOpacity] = useState(false);
  const [{ hoveredElement }] = useSocialStateValue();

  useEffect(() => {
    let timeout: number;

    if (hoveredElement) {
      if (hoveredElement !== referenceEl) {
        setShouldReduceOpacity(true);
      } else {
        setShouldReduceOpacity(false);
      }
    } else if (!hoveredElement && shouldReduceOpacity) {
      timeout = setTimeout(() => setShouldReduceOpacity(false), 100);
    }

    return () => clearTimeout(timeout);
  }, [hoveredElement, shouldReduceOpacity, referenceEl]);

  return { shouldReduceOpacity };
};

export default useOpacityAdjuster;
