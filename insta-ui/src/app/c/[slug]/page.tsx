import Header from "@/components/Header";
import ProgressOverlay from "@/components/ProgressOverlay";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileTabs } from "@/lib/enums";
import dynamic from "next/dynamic";

export default function Main() {
  const Previewer = dynamic(() => import("@/components/Previewer"), {
    ssr: false,
  });

  const SideBar = dynamic(() => import("@/components/SideBar"), {
    ssr: false,
  });

  const ChatInterface = dynamic(() => import("@/components/ChatInterface"), {
    ssr: false,
  });

  return (
    <>
      <ProgressOverlay />
      {/* Desktop Layout */}
      <div className="hidden sm:flex sm:flex-col sm:h-screen">
        <Header />
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
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

      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden h-screen">
        <Header />
        <Tabs defaultValue={MobileTabs.ChatInterface}>
          <TabsList className="flex gap-2 bg-gray-100 rounded-none">
            <TabsTrigger value={MobileTabs.ChatInterface}>Chat</TabsTrigger>
            <TabsTrigger value={MobileTabs.Preview}>Preview</TabsTrigger>
          </TabsList>
          <TabsContent
            value={MobileTabs.ChatInterface}
            className="h-[calc(100vh-128px)] m-0"
          >
            <SideBar />
            <ChatInterface />
          </TabsContent>
          <TabsContent
            value={MobileTabs.Preview}
            className="h-[calc(100vh-128px)] m-0"
          >
            <Previewer />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
