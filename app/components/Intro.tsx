'use client'
import { Heading, Flex } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const titles = ["Machine Learning Engineer", "Software Developer", "Web Developer", "Data Engineer"];

const Intro = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (!deleting && charIndex < titles[index].length) {
        setText((prev) => prev + titles[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (deleting && charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setDeleting(!deleting);
        if (!deleting) setIndex((prev) => (prev + 1) % titles.length);
      }
    }, deleting ? 50 : 150);

    return () => clearTimeout(interval);
  }, [charIndex, deleting, index]);

  return (
    <Flex direction="column" align="center" className="w-full px-4 sm:px-8 md:px-12 text-center">
      <Heading 
        as="h1" 
        size="9" 
        className="text-4xl sm:text-5xl md:text-6xl font-bold break-words leading-tight max-w-xs sm:max-w-sm md:max-w-lg"
      >
        Hey there,
      </Heading>
      <Heading 
        as="h2" 
        size="9" 
        className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-xs sm:max-w-sm md:max-w-lg"
      >
        I'm Aditya Padgal,
      </Heading>
      <motion.div
        className="h-10 text-2xl sm:text-3xl md:text-4xl font-medium text-blue-500 leading-tight"
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
        <span className="animate-blink">|</span>
      </motion.div>
      <br></br>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-500 max-w-xs sm:max-w-md md:max-w-xl leading-snug">
        "Innovating with Code, Engineering Scalable Solutions, and Crafting Intelligent Experiences." 🚀
      </p>
    </Flex>
  );
};

export default Intro;

