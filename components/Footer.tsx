'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, MapPin, Map, Phone, ExternalLink, LibraryIcon } from 'lucide-react';
import ISI from '../public/ISI.png';
import MLRG from '../public/MLRG.png';
import { getBuildInfo, formatBuildTime } from '@/lib/build-info';

export function Footer() {
  const [buildInfo, setBuildInfo] = useState<{ buildTime: string; isDevelopment: boolean } | null>(null);

  useEffect(() => {
    setBuildInfo(getBuildInfo());
    
    // In development mode, update the time every second
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        setBuildInfo(getBuildInfo());
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const socialLinks = [
    { icon: LibraryIcon, href: 'https://scholar.google.co.in/citations?hl=en&user=L8XYpAwAAAAJ&view_op=list_works&sortby=pubdate', label: 'Google Scholar'},
    { icon: Github, href: 'https://github.com/mlrgisi', label: 'GitHub' },
    // { icon: Twitter, href: '#', label: 'Twitter' },
    // { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mlrgisical@gmail.com?subject=[FromMLRGSiteFooter]&cc=swagatam.das@isical.ac.in', label: 'Email' },
    { icon: Phone, href: 'tel:+913325752915', label: 'Call' },
  ];

  const quickLinks = [
    { href: 'https://web.isical.ac.in/', label: 'Indian Statistical Institute' },
    { href: 'http://www.isical.ac.in/~ecsu/', label: 'ECSU, ISI' },
    { href: 'http://www.isical.ac.in/~wsdl/', label: 'WSDL' },
    // { href: '/contact', label: 'Contact' },
  ];

  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Lab Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span> */}
              {/* </div>*/}
              {/* <img
                  src={ISI.src}
                  width="30"
                  height="15"
                  alt="Picture of the author"
                /> */}
              {/* <span className="font-bold text-xl">Research Group</span> */}
              {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-200 via-indigo-400 to-purple-500 p-[3px] flex items-center justify-center"> */}
              <div className="w-10 h-10 rounded-lg p-[3px] flex items-center justify-center">
                  <img
                    src={MLRG.src}
                    alt="Lab Logo"
                    className="w-30 h-25 object-cover"
                  />
              </div>
              <div className="border-l border-gray-300 h-10 mx-4"></div>
              <div className="w-10 h-10 rounded-lg p-[3px] flex items-center justify-center">
                  <img
                    src={ISI.src}
                    alt="ISI Logo"
                    className="w-30 h-25 object-cover"
                  />
              </div>
              {/* <div className="flex flex-col">
                  <span className="font-bold text-lg text-gradient leading-tight">ML</span>
                  <span className="font-semibold text-sm text-gradient leading-tight">Research Group</span>
              </div> */}
            </div>
            <p className="text-gray-400 leading-relaxed">
              Advancing the frontiers of machine learning, deep learning, and high-dimensional statistics through rigorous research.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
               <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target='_blank'
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Map className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">
                    {/* Electronics and Communication Sciences Unit<br /> */}
                    Indian Statistical Institute<br />
                    Room: 912<br />
                    9<sup>th</sup> Floor, S. N. Bose Building<br />
                    203, B. T. Road, Kolkata 700-108<br />
                    WB, India
                  </p>
                </div>
              </div>
              {/* <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div> */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a
                  href='mailto:mlrgisical@gmail.com?subject=[FromMLRGSiteFooter]&cc=swagatam.das@isical.ac.in'
                  target='_blank'
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                <span className="text-gray-400">mlrgisical@gmail.com</span>
              </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Research Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Publications:</span>
                <span className="font-semibold">50+</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-gray-400">Citations:</span>
                <span className="font-semibold">2,500+</span>
              </div> */}
              {/* <div className="flex justify-between">
                <span className="text-gray-400">H-Index:</span>
                <span className="font-semibold">45</span>
              </div> */}
              <div className="flex justify-between">
                <span className="text-gray-400">Team Members:</span>
                <span className="font-semibold">21+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2020 – {new Date().getFullYear()} ML Research Group. All rights reserved.<br/>
              {/* Developed by, Sankha Subhra Mullick, on January 29, 2020. */}
              Developed on January 29, 2020.
            </div>
            {/* <div className="text-gray-400 text-sm">
              Last updated: {days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}; {date.getHours()}:{date.getMinutes()} <br/>
              Updated by Lab Members
            </div> */}
            {/***************** New Attachment ***********************/}
	    <div className="text-gray-400 text-sm text-center md:text-right">
              {buildInfo ? (
                buildInfo.isDevelopment ? (
                  <div>
                    <div className="text-green-400 font-medium">Development Mode</div>
                    <div>{formatBuildTime(buildInfo.buildTime)}</div>
                  </div>
                ) : (
                  <div>
                    <div>Last built: {formatBuildTime(buildInfo.buildTime)}
                     <br/>
                     Updated by Lab Members
                    </div>
                  </div>
                )
              ) : (
                'Loading...'
              )}
            </div>
            {/***************** New Attachment ***********************/}
          </div>
        </div>
      </div>
    </footer>
  );
}
