import { useEffect, useState } from "react";
/**
 * Gets the closest anchor to the current scroll position
 * FIXME: The offset is weird when scrolling over long paragraphs.
 * @returns string | null
 */
const useClosestAnchor = (): [string | null, string | null] => {
  const [anchor, setAnchor] = useState<string | null>(null);
  const [parentAnchor, setParentAnchor] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const parentAnchors = document.querySelectorAll(".md h2[id]");

      let closestParentAnchor = null;
      let closestParentAnchorDistance = Infinity;

      const anchors = document.querySelectorAll(".md [id]");

      let closestAnchor = null;
      let closestDistance = Infinity;

      const topMargin = 70;

      parentAnchors.forEach((element) => {
        const distance = Math.abs(
          element.getBoundingClientRect().top - topMargin,
        );
        if (distance < closestParentAnchorDistance) {
          closestParentAnchorDistance = distance;
          closestParentAnchor = element.id;
        }
      });

      anchors.forEach((element) => {
        const distance = Math.abs(
          element.getBoundingClientRect().top - topMargin,
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestAnchor = element.id;
        }
      });

      if (closestAnchor && closestParentAnchor) {
        setAnchor(closestAnchor);
        setParentAnchor(closestParentAnchor);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [anchor, parentAnchor];
};

export default useClosestAnchor;
