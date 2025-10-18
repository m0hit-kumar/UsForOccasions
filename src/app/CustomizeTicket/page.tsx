"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { TicketService } from "@/network/tickets";
import { useToast } from "@/hooks/use-toast";
import TabolaTicketTemplate from "@/_components/TabolaTicketTemplate";
import { TicketStyle } from "@/_components/Datatype";
import { useRouter } from "next/navigation";
import CustomizeTambolaTicket from "@/_components/CustomizeTambolaTicket";

export default function CustomizeTicketPage() {
  const router = useRouter();
  const { getTicketsLocal, saveTicketsLocal, createRoom } = TicketService();
  const { toast } = useToast();
  
  // Ticket customization data
  const localTicketDesign = getTicketsLocal();
  const defaultTicket = [
    89, 95, 0, 99, 0, 55, 79, 0, 0, 0, 1, 0, 9, 0, 65, 83, 90, 0, 36, 0, 73, 31,
    0, 57, 0, 21, 0,
  ];
  
  const [ticketStyle, setTicketStyle] = useState<TicketStyle>({
    backgroundColor: localTicketDesign?.Background ?? "#ffffff",
    borderColor: localTicketDesign?.Border ?? "#000000",
    color: localTicketDesign?.Text ?? "#000000",
  });
  
  const [hostName, setHostName] = useState<string>(localTicketDesign?.HostName ?? "HostName");

  const handleSaveAndNext = () => {
    // Save ticket design to Firebase and create room
    const ticketData = {
      hostNameValue: hostName || "Host Name",
      backgroundValue: ticketStyle.backgroundColor || "#ffffff",
      borderValue: ticketStyle.borderColor || "#000000",
      textValue: ticketStyle.color || "#000000",
    };

    createRoom(ticketData, (success, error, response) => {
      if (success) {
        const newRoomId = response.roomId;
        const newRoomLink = `${window.location.origin}/${newRoomId}`;
        
        // Save room info to localStorage for HostEvent page
        localStorage.setItem('currentRoomId', newRoomId);
        localStorage.setItem('currentRoomLink', newRoomLink);
        
        toast({
          title: "Room created successfully!",
          description: `Redirecting to game...`,
        });
        
        // Redirect to HostEvent page
        router.push("/HostEvent");
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
    <div className="flex-1 container mx-auto py-12 px-6 md:px-0">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white"
        >
          ← Back
        </Button>
      </div>
      
      <h1 className="text-4xl mb-5 font-bold text-white">Customize Your Ticket</h1>
      
      
      {/* Customization Interface */}
      <div className="mb-8">
        <CustomizeTambolaTicket 
          ticketStyle={ticketStyle}
          setTicketStyle={setTicketStyle}
          hostName={hostName}
          setHostName={setHostName}
        />
      </div>
      
      {/* Instructions Box */}
      <div className="mb-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">📋 How to Use This Page</h3>
          <div className="space-y-2 text-blue-700">
            <p><strong>1. Customize Your Ticket:</strong> Use the controls on the right to change colors and host name</p>
            <p><strong>2. Preview Changes:</strong> See your ticket design update in real-time on the left</p>
            <p><strong>3. Download Sample:</strong> Click the blue button below the preview to download a single ticket</p>
            <p><strong>4. Generate Multiple Tickets:</strong> Use the "Download Tickets for Offline Play" button to create multiple tickets</p>
            <p><strong>5. Save & Start Game:</strong> Click "Save Ticket & Next" to create a room and start hosting</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
