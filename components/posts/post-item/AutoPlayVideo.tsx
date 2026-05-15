'use client';

import React, { useRef, useEffect } from 'react';

interface AutoPlayVideoProps {
  src: string;
}

const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Play when 60% visible
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch((err) => {
              // Browsers might block autoplay if not muted or no user interaction
              console.log('Autoplay blocked:', err);
            });
          } else {
            videoRef.current.pause();
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      muted // Required for autoplay in most browsers
      playsInline
      loop
      className="max-h-[512px] w-full rounded-[8px] mb-2 object-contain bg-black"
    />
  );
};

export default AutoPlayVideo;
