import Conversation from "@/components/Conversation";
import Header from "../components/Header";
import Previewer from "../components/Previewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <>
      <Header />
      <>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[calc(100vh-70px)]"
        >
          <ResizablePanel minSize={25}>
            <Conversation />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={50}>
            <Previewer />
          </ResizablePanel>
        </ResizablePanelGroup>
      </>
    </>
  );
}
