"use client";
import CustomizeTambolaTicket from "@/_components/CustomizeTambolaTicket";
import TicketGenrator from "@/_components/TicketGenrator";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TicketStyle } from "@/_components/Datatype";
import SendTambolaTickets from "@/_components/SendTambolaTickets";
import { TicketService } from "@/network/tickets";
import { useSearchParams, useRouter } from "next/navigation";

const GenerateTickets = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const skipCustomize = searchParams.get('skipCustomize') === 'true';
  
  const [ticketBinary, setTicketBinary] = useState<string[]>([]);
  const [sectionValue, setSectinValue] = useState<number>(skipCustomize ? 2 : 1);
  const {
    saveTicketsLocal,
    getTicketsLocal,
    saveTicketToDB,
    generateUniqueRoomID,
    getTicketFromDB,
  } = TicketService();
  const localTicketDesign = getTicketsLocal();
  const [hostName, setHostName] = useState<string>(
    localTicketDesign?.HostName ?? "HostName"
  );

  const [ticketStyle, setTicketStyle] = useState<TicketStyle>({
    backgroundColor: localTicketDesign?.Background ?? "#ffffff",
    borderColor: localTicketDesign?.Border ?? "#000000",
    color: localTicketDesign?.Text ?? "#000000",
  });


  return (
    <div className="flex-1 container mx-auto py-6 sm:py-12 px-4 sm:px-6">
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
      
      <div className="space-y-4 sm:space-y-5">
        <h2 className="text-3xl font-bold mb-5 text-white">Generate & Download Tickets</h2>
      </div>

      <div className="mt-6 sm:mt-8">
        {sectionValue == 1 && (
          <CustomizeTambolaTicket
            setTicketStyle={setTicketStyle}
            ticketStyle={ticketStyle}
            hostName={hostName}
            setHostName={setHostName}
          />
        )}
        
        {sectionValue == 2 && (
          <TicketGenrator
            ticketStyle={ticketStyle}
            hostName={hostName}
            setTicketBinary={setTicketBinary}
          />
        )}
        {sectionValue == 3 && (
          <SendTambolaTickets ticketBinary={ticketBinary} />
        )}
      </div>
    </div>
  );
};

export default GenerateTickets;
