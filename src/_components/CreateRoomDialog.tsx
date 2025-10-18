"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TicketService } from "@/network/tickets";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CreateRoomDialog({ onRoomCreated }: { onRoomCreated?: (roomId: string, roomLink: string) => void }) {
  const [open, setOpen] = useState(false);
  const { createRoom, getTicketsLocal } = TicketService();
  const { toast } = useToast();
  const router = useRouter();

  const handleCreateRoom = () => {
    const localTicketDesign = getTicketsLocal();
    
    // Use local design if available, otherwise use defaults
    const ticketData = localTicketDesign ? {
      hostNameValue: localTicketDesign.HostName || "Host Name",
      backgroundValue: localTicketDesign.Background || "#ffffff",
      borderValue: localTicketDesign.Border || "#000000",
      textValue: localTicketDesign.Text || "#000000",
    } : {
      hostNameValue: "Host Name",
      backgroundValue: "#ffffff",
      borderValue: "#000000",
      textValue: "#000000",
    };

    createRoom(ticketData, (success, error, response) => {
      if (success) {
        const roomId = response.roomId;
        const roomLink = `${window.location.origin}/${roomId}`;
        
        toast({
          title: "Room created successfully!",
          description: `Room ID: ${roomId}. Share this link with players.`,
        });
        
        // Copy room link to clipboard
        navigator.clipboard.writeText(roomLink);
        
        toast({
          title: "Room link copied!",
          description: "Share this link with players to join the game.",
        });
        
        // Notify parent component about the new room
        if (onRoomCreated) {
          onRoomCreated(roomId, roomLink);
        }
        
        setOpen(false);
      } else {
        toast({
          title: "Failed to create room",
          description: error?.message || "Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">
        Create Room
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Create a room and share the link with players. You can customize the ticket design or use the default.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button onClick={handleCreateRoom} className="w-full">
            Create Tambola Room
          </Button>
          
          <div className="text-sm text-gray-600">
            <p>• Uses default ticket design (or your custom design if saved)</p>
            <p>• Players will get unique tickets</p>
            <p>• Room link will be copied to clipboard</p>
            <p>• Share your screen for the game</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              router.push('/GenerateTickets');
            }}
            className="flex-1"
          >
            Customize Ticket
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("https://meet.google.com/new", "_blank")}
            className="flex-1"
          >
            Google Meet
          </Button>
        </div>
        
        <Button variant="destructive" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
export default CreateRoomDialog;