import ChatInterface from "@/components/ChatInterface";
import Previewer from "@/components/Previewer";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function Main() {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="w-3/5">
          <ChatInterface />
        </div>
        <div className="w-1/5">
          <Previewer />
        </div>
      </div>
    </>
  );
}
