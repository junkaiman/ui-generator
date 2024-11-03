import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
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
      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="w-1/5 h-full">
          <SideBar />
        </div>
        <div className="w-3/5 h-full">
          <ChatInterface chatId={slug} />
        </div>
        <div className="w-1/5 h-full">
          <Previewer />
        </div>
      </div>
    </div>
  );
}
