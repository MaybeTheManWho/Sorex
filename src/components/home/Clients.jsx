"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clients from '@/data/clients';

const Clients = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  return (
    <section className="py-20">
      <div className="container-section">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Clients</h2>
          <div className="w-20 h-1 bg-primary-green mx-auto mb-6"></div>
          <p className="text-gray-600">
            We've had the pleasure of working with amazing clients across various industries.
            Here's what some of them have to say about our work.
          </p>
        </motion.div>
        
        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
              onClick={() => setActiveTestimonial(index)}
            >
              <div 
                className={`p-4 rounded-lg transition-all cursor-pointer hover:shadow-md ${
                  activeTestimonial === index ? 'minecraft-panel' : 'bg-white'
                }`}
              >
                {/* You'll need to replace this with actual client logos */}
                <div className="h-16 w-full relative">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <p className="font-medium text-gray-600">{client.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="minecraft-panel p-8 rounded-lg relative">
            {/* Quote mark */}
            <div className="absolute top-4 left-4 text-5xl text-primary-green opacity-20">
              "
            </div>
            
            <div className="relative">
              <blockquote className="text-lg md:text-xl italic text-gray-600 mb-4">
                {clients[activeTestimonial].testimonial}
              </blockquote>
              
              <div className="flex items-center mt-6">
                {/* Client profile image placeholder */}
                <div className="w-12 h-12 rounded-full bg-primary-green/20 flex items-center justify-center text-primary-green font-bold mr-4">
                  {clients[activeTestimonial].name.charAt(0)}
                </div>
                
                <div>
                  <p className="font-bold">{clients[activeTestimonial].contact}</p>
                  <p className="text-gray-600">{clients[activeTestimonial].name}</p>
                  <p className="text-sm text-gray-500">{clients[activeTestimonial].description}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === index 
                    ? 'bg-primary-green scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;