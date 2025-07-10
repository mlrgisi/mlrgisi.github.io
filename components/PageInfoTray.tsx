'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Music, Clock, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useLastUpdated } from './LastUpdatedContext';

export function PageInfoTray() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { lastUpdated } = useLastUpdated();
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const trayRef = useRef<HTMLDivElement>(null);

  // Audio state - lifted from MusicPlayer
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio event listeners and functions
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Auto-collapse after 5 seconds of inactivity
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    if (isExpanded) {
      inactivityTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }
  };

  // Set up inactivity timer when expanded
  useEffect(() => {
    if (isExpanded) {
      resetInactivityTimer();
    } else {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [isExpanded]);

  // Add event listeners for user activity
  useEffect(() => {
    const handleActivity = () => {
      if (isExpanded) {
        resetInactivityTimer();
      }
    };

    const trayElement = trayRef.current;
    if (trayElement && isExpanded) {
      trayElement.addEventListener('mousemove', handleActivity);
      trayElement.addEventListener('click', handleActivity);
      trayElement.addEventListener('keydown', handleActivity);
      trayElement.addEventListener('touchstart', handleActivity);
    }

    return () => {
      if (trayElement) {
        trayElement.removeEventListener('mousemove', handleActivity);
        trayElement.removeEventListener('click', handleActivity);
        trayElement.removeEventListener('keydown', handleActivity);
        trayElement.removeEventListener('touchstart', handleActivity);
      }
    };
  }, [isExpanded]);

  // Music Player Component (inline to access audio state)
  const MusicPlayerControls = () => (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </motion.button>

        <div className="text-xs text-gray-600 dark:text-gray-400 min-w-[60px]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
        <motion.div
          className="bg-blue-500 h-1 rounded-full"
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        ♪ Für Elise - Ludwig van Beethoven
      </div>
    </div>
  );

  return (
    <>
      {/* Audio element - always rendered and hidden to preserve state */}
      <audio
        ref={audioRef}
        src="/music/FurElise.ogg"
        muted={isMuted}
        loop
        preload="metadata"
        className="hidden"
      />

      <motion.div
        ref={trayRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-4 right-4 z-40"
      >
        <motion.div
          layout
          className={`glass-effect border border-white/20 dark:border-gray-700/50 shadow-xl backdrop-blur-md transition-all duration-300 ${
            isExpanded 
              ? 'rounded-2xl' 
              : 'rounded-full w-12 h-12 flex items-center justify-center'
          }`}
        >
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              // Collapsed Circular Button
              <motion.button
                key="collapsed"
                onClick={() => setIsExpanded(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
            ) : (
              // Expanded Content
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="min-w-[280px]"
              >
                {/* Header with Close Button */}
                <div className="p-3 border-b border-white/10 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-blue-500" />
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Info Panel
                      </span>
                    </div>
                    
                    <motion.button
                      onClick={() => setIsExpanded(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 rounded-full hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Music Player */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-blue-500" />
                      {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Background Music
                      </span> */}
                    </div>
                    <MusicPlayerControls />
                  </div>

                  {/* Last Updated */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Updated
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 bg-white/10 dark:bg-gray-800/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                      {lastUpdated ? new Date(lastUpdated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not specified'}
                    </div>
                  </div>

                  {/* Auto-collapse indicator */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center opacity-60">
                    Auto-collapses in 5s of inactivity
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
