import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreviewerTabs } from "@/lib/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
export default function Previewer() {
  return (
    <Tabs defaultValue={PreviewerTabs.Preview} className="p-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={PreviewerTabs.Preview}>Preview</TabsTrigger>
        <TabsTrigger value={PreviewerTabs.Code}>Code</TabsTrigger>
      </TabsList>
      <TabsContent value={PreviewerTabs.Preview} className="min-h-80vh">
        <Card className="p-20 border rounded-xl"></Card>
      </TabsContent>
      <TabsContent value={PreviewerTabs.Code}>
        <Card className="py-3 border rounded-xl">
          <CardContent>
            <div className="flex justify-end">
              <FontAwesomeIcon icon={faCopy} />
            </div>
            <div className="py-20"></div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
