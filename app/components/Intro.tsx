'use client'
import { Heading, Flex, HoverCard, Text, Box, Link, Avatar } from '@radix-ui/themes';
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
      <p className="mt-4 text-lg sm:text-xl md:text-md text-gray-300 max-w-xs sm:max-w-md md:max-w-xl leading-snug">
        "Innovating with Code, Engineering Scalable Solutions, and Crafting Intelligent Experiences."
      </p>
      <br></br>
      <Text className='text-gray-400'>
        Curious about me? My AI bot {" "}
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link href="#" target="">
              @chatme
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content maxWidth="300px">
            <Flex gap="4">
              <Avatar
                size="3"
                fallback="Ai"
                radius="full"
              />
              <Box>
                <Heading size="3" as="h3">
                  Chatbot
                </Heading>
                <Text as="div" size="2" color="gray" mb="2">
                  @chatme
                </Text>
                <Text as="div" size="2">
                Built a smart little AI bot, @chatme, because why not let AI do the talking? Used Pinecone to keep its memory sharp, Next.js to make it look good, and LLMs to make it sound smart (or at least pretend to). Now, instead of me explaining my portfolio, my bot does the job - 24/7, no coffee breaks needed.
                </Text>
              </Box>
            </Flex>
          </HoverCard.Content>
        </HoverCard.Root>{" "}
        , has the answers! 🤖
      </Text>

    </Flex>
  );
};

export default Intro;

