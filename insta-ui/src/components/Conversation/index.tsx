import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
export default function Conversation() {
  return (
    <div className="p-2">
      <div className="p-2 h-[calc(100vh-212px)] border rounded-lg text-center">Conversations</div>
      <div>
        <Label>Your message here: </Label>
        <Textarea placeholder="Type your message here." id="message" />
        <div className="p-2 flex justify-end">
          <Button size="sm">Send</Button>
        </div>
      </div>
    </div>
  );
}
