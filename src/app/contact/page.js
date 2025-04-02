'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import PageTransition from '@/components/layout/PageTransition';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    contactMethod: 'email',
    email: '',
    discord: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create API request body
      const requestBody = {
        name: formData.name,
        email: formData.contactMethod === 'email' ? formData.email : '',
        message: formData.message,
        discord: formData.contactMethod === 'discord' ? formData.discord : '',
        contactMethod: formData.contactMethod
      };
      
      // Send to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ success: true, message: 'Message sent successfully!' });
        // Reset form
        setFormData({
          name: '',
          message: '',
          contactMethod: 'email',
          email: '',
          discord: ''
        });
      } else {
        setFormStatus({ success: false, message: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({ success: false, message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social media links
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'Twitter/X',
      url: 'https://twitter.com/yourusername',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'Discord',
      url: 'https://discord.com/users/yourid',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1, 0.1)}
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            variants={fadeIn("down", 0.2)}
            className="text-4xl font-bold mb-6 text-center text-white"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            variants={fadeIn("up", 0.3)}
            className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-300"
          >
            Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
          </motion.p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={fadeIn("right", 0.4)}
            >
              <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Send a Message</h2>
                
                {formStatus && (
                  <div className={`mb-6 p-4 rounded-md ${
                    formStatus.success 
                      ? 'bg-green-900/50 text-green-300 border border-green-600' 
                      : 'bg-red-900/50 text-red-300 border border-red-600'
                  }`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="I'd like to discuss..."
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={formData.contactMethod === 'email'}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                        />
                        <span className="ml-2 text-gray-300">Email</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="discord"
                          checked={formData.contactMethod === 'discord'}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                        />
                        <span className="ml-2 text-gray-300">Discord</span>
                      </label>
                    </div>
                  </div>
                  
                  {formData.contactMethod === 'email' ? (
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label htmlFor="discord" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Discord Username
                      </label>
                      <input
                        type="text"
                        id="discord"
                        name="discord"
                        value={formData.discord}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder="username#1234"
                      />
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn("left", 0.4)}
              className="lg:mt-12"
            >
              <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Connect With Me</h2>
                
                <p className="text-gray-300 mb-8">
                  You can also reach out to me through any of these platforms. I'm usually quick to respond and always open to new connections.
                </p>
                
                <div className="space-y-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                    >
                      <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-800 text-blue-400">
                        {social.icon}
                      </div>
                      <div className="ml-4">
                        <span className="text-white font-medium">{social.name}</span>
                      </div>
                      <div className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>
                
                <div className="mt-12 p-6 bg-gray-700 rounded-lg border border-gray-600">
                  <h3 className="text-xl font-semibold mb-4 text-white">Office Hours</h3>
                  <p className="text-gray-300 mb-2">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-gray-300">Weekend: By appointment only</p>
                  <p className="mt-4 text-gray-400">
                    Response time: Usually within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}