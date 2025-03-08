import Chat from "./components/Chat";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Ask Me About My Resume</h1>
      <Chat/>
    </div>
  );
}
