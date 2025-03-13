import { Box, Container, Flex } from "@radix-ui/themes";
import ChatPage from "./components/Chat";
import Intro from "./components/Intro";
import ImageBox from "./components/ImageBox";
import LinkFill from "./components/LinkFill";
import Divider from "./components/Divider";

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
        <footer className="fixed bottom-0 left-0 w-full bg-indigo-600 text-white py-4 overflow-hidden">
          <LinkFill/>
        </footer>
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-indigo-600 text-white">
        <header className="absolute top-0 left-0 w-full bg-indigo-600 text-white py-4 text-center overflow-hidden">
          <LinkFill/>
        </header>
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <Divider/>
        </div>
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
