import ChatInterface from "@/components/ChatInterface";
import Previewer from "@/components/Previewer";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function Main() {
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
