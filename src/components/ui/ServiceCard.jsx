"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  href = '#',
  animationDelay = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration:.5, delay: animationDelay }}
      viewport={{ once: true }}
      className="minecraft-panel rounded-lg relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Effect */}
      <div 
        className={`absolute inset-0 bg-primary-green/10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <div className="p-6">
        {/* Icon */}
        <div className="w-16 h-16 mb-4 relative">
          {icon ? (
            <Image 
              src={icon} 
              alt={title} 
              width={64} 
              height={64}
              className="object-contain"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-green/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Link */}
        <Link 
          href={href}
          className={`inline-flex items-center text-primary-green font-medium transition-all ${
            isHovered ? 'translate-x-2' : ''
          }`}
        >
          Learn more
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;