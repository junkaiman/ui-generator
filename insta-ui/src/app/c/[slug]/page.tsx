import Header from "@/components/Header";
import ProgressOverlay from "@/components/ProgressOverlay";
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

  const SideBar = dynamic(() => import("@/components/SideBar"), {
    ssr: false,
  });

  const ChatInterface = dynamic(() => import("@/components/ChatInterface"), {
    ssr: false,
  });

  const slug = (await params)?.slug;

  return (
    <>
      <ProgressOverlay />
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
              <SideBar chatId={slug} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={40} minSize={30} maxSize={70}>
              <ChatInterface chatId={slug} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={40} minSize={20} maxSize={50}>
              <Previewer />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}
