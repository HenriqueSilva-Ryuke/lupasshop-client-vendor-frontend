import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';

interface UseFeaturesScrollProps {
  featuresCount: number;
}

export const useFeaturesScroll = ({ featuresCount }: UseFeaturesScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalHeight = featuresCount * 100;

  const getFeatureTransforms = (index: number) => {
    const sectionStart = index / featuresCount;
    const sectionEnd = (index + 1) / featuresCount;

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
    getFeatureTransforms,
    finalCTAOpacity,
  };
};