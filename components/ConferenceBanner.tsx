'use client';

import { motion } from 'framer-motion';
import AAAI from '../public/logos/AAAI.png';
import ICML from '../public/logos/ICML.svg';
import ICLR from '../public/logos/ICLR.png';
import CVF from '../public/logos/CVF.svg';
import NeurIPS from '../public/logos/NeurIPS.svg';
import TPAMI from '../public/logos/TPAMI.jpg';
import MICCAI from '../public/logos/Miccai.png';
import TNNLS from '../public/logos/TNNLS.jpg'; 
import TMLR from '../public/logos/TMLR.png';
import ICPR from '../public/logos/ICPR.jpg';

interface Conference {
  title: string;
  image?: any;
}

const conferences: Conference[] = [
  {
    title:'AAAI',
    image: AAAI,
  }, 
  {
    title: 'ICML',
    image: ICML,
  },
  {
    title: 'ICLR',
    image: ICLR,
  },
  {
    title: 'CVPR',
    image: CVF,
  }, 
  {
    title: 'TMLR',
    image: TMLR,
  },
  {
    title: 'MICCAI',
    image: MICCAI
  },
  {
    title: 'NeurIPS',
    image: NeurIPS,
  },
  {
    title: 'ICCV',
    image: CVF,
  },
  {
    title: 'IEEE TNNLS',
    image: TNNLS,
  },
  {
    title: 'ICPR',
    image: ICPR,
  },
];

export function ConferenceBanner() {
  return (
    <div className="py-4 overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-y border-gray-200 dark:border-gray-700">
      <div className="relative">
        <motion.div
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex space-x-16 whitespace-nowrap"
        >
          {/* Duplicate the conferences array to create seamless loop */}
          {[...conferences, ...conferences, ...conferences].map((conference, index) => (
            <div
              key={`${conference}-${index}`}
              className="flex items-center space-x-16"
            >
              {/* {!conference.image && ( */}
                <span className="text-xl font-bold text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  {/* {conference.title} */}
                </span>
              {/* )} */}
              {/* {conference.image && ( */}
                <img
                  src={conference.image.src} width="50" height="40" alt="Logo"
                />
              {/* )} */}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
