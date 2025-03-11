import { Box, Container, Flex } from "@radix-ui/themes";
import ChatPage from "./components/Chat";
import Intro from "./components/Intro";
import ImageBox from "./components/ImageBox";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        <Flex className="w-full flex-col md:flex-row items-center">
          <Box className="flex flex-col w-full md:w-1/2">
            <Container size="3">
                <Intro />
                <ChatPage />
            </Container>
          </Box>
          <Box className="flex flex-col z-0 w-full md:w-1/2 h-full justify-center items-center">
            <Container size="3">
              <ImageBox />
            </Container>
          </Box>
        </Flex>
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-indigo-600 text-white">
          <h2 className="text-4xl">The Second Title</h2>
          <p>Scroll Down</p>
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-purple-600 text-white">
          <h2 className="text-4xl">The Third Title</h2>
          <p>Scroll Down</p>
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-neutral-800 text-white">
          <h2 className="text-4xl">The Fourth Title</h2>
      </div>
    </div>
  );
}
