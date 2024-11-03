import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import dynamic from "next/dynamic";

export default async function Main({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const Previewer = dynamic(() => import("@/components/Previewer"), {
    ssr: false,
  });

  const slug = (await params)?.slug;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 overflow-hidden"
        >
          <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
            <SideBar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={40} minSize={30} maxSize={70}>
            <ChatInterface />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={40} minSize={20} maxSize={50}>
            <Previewer />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
