import { useEffect, useRef, useState } from 'react';

export const useMusic = (musicPath: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(musicPath);
    audioRef.current.loop = true;
    audioRef.current.muted = true; // Start muted to comply with autoplay policy

    // Try to play
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicPath]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }

      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.warn('Playback failed:', error);
        });
    }
  };

  return {
    audioRef,
    isPlaying,
    handlePlay
  };
}; 