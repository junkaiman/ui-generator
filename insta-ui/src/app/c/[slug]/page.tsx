import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import dynamic from "next/dynamic";

export default function Main() {
  const Previewer = dynamic(() => import("@/components/Previewer"), {
    ssr: false,
  });

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="w-1/5 h-full">
          <SideBar />
        </div>
        <div className="w-3/5 h-full">
          <ChatInterface />
        </div>
        <div className="w-1/5 h-full">
          <Previewer />
        </div>
      </div>
    </div>
  );
}
