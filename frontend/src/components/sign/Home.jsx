import React from 'react';
import { motion } from 'framer-motion';
import Fish from '../../assets/Fish.gif';

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-5xl font-extrabold text-gray-800">Welcome to My Website</h1>
        <p className="text-lg mt-4 text-gray-700">You can add your tasks here, feel free to use.</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mt-10"
      >
        <motion.img
          src={Fish}
          alt="Task Management in Action"
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-80 h-auto rounded-2xl shadow-xl border-4 border-white"
        />
      </motion.div>
    </div>
  );
};

export default Home;