'use client';

import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  toggleMute: () => void;
  formatTime: (time: number) => string;
  progressPercentage: number;
}

export function MusicPlayer({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  togglePlay,
  toggleMute,
  formatTime,
  progressPercentage
}: MusicPlayerProps) {
  return (
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
        ♪ Für Elise - Beethoven
      </div>
    </div>
  );
}