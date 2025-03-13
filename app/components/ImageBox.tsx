'use client'
import { Box, Button, Separator, Flex } from "@radix-ui/themes";
import Contact from "./Contact";
import Download from "./Download";

export default function ImageBox() {
  return (
    <Box py="9" className="flex flex-col justify-center items-center w-full h-full">
      <div className="relative flex justify-center items-center w-full">
      <img
          src="/bg_me.jpeg"
          alt="Descriptive Alt Text"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg shadow-lg mx-auto"
        />
      </div>
      <Flex gap="4" align="center" justify="center" className="w-full mt-4">
        <Download/>
        <Separator orientation="vertical" className="h-6 w-1 bg-gray-500"/>
        <Contact/>
      </Flex>
    </Box>
  );
}
