import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-10 text-center"
    >
      <h1 className="text-4xl font-bold text-gray-800">About Me</h1>

      <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
        I'm a passionate software engineer from India, specializing in building
        applications and fostering technical education through hands-on learning.
        Currently, I am pursuing my Bachelor's degree at 
        <span className="font-semibold text-gray-800"> Chandigarh University</span>,
        one of India's most trusted and highly ranked private universities.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6"
      >
        <a
          href="https://www.linkedin.com/in/jaideep-kumar-000b5424b/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-black text-white rounded-2xl shadow-md hover:scale-105 transition"
        >
          Contact Me
        </a>
      </motion.div>
    </motion.section>
  );
};

export default About;