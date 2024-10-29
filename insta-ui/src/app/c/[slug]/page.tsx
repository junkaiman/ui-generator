import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import dynamic from "next/dynamic";

export default function Main() {
  const Previewer = dynamic(() => import("@/components/Previewer"), {
    ssr: false,
  });

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
