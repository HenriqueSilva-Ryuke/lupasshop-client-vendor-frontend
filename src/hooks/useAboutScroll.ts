import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';

interface UseAboutScrollProps {
  sectionsCount: number;
}

export const useAboutScroll = ({ sectionsCount }: UseAboutScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalHeight = sectionsCount * 100;

  const getSectionTransforms = (index: number) => {
    const sectionStart = index / sectionsCount;
    const sectionEnd = (index + 1) / sectionsCount;

    // Increased spacing between entrance and exit
    const opacity = useTransform(
      scrollYProgress,
      [sectionStart - 0.2, sectionStart, sectionEnd, sectionEnd + 0.2],
      [0, 1, 1, 0]
    );

    const scale = useTransform(
      scrollYProgress,
      [sectionStart - 0.2, sectionStart, sectionEnd, sectionEnd + 0.2],
      [0.8, 1, 1, 0.8]
    );

    const y = useTransform(
      scrollYProgress,
      [sectionStart - 0.2, sectionStart, sectionEnd, sectionEnd + 0.2],
      [1800, 0, 0, -1800]
    );

    return { opacity, scale, y };
  };

  const finalCTAOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return {
    containerRef,
    scrollYProgress,
    totalHeight,
    getSectionTransforms,
    finalCTAOpacity,
  };
};