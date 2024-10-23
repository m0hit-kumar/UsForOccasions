"use client";
import CustomizeTambolaTicket from "@/_components/CustomizeTambolaTicket";
import TicketGenrator from "@/_components/TicketGenrator";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TicketStyle } from "@/_components/Datatype";
import SendTambolaTickets from "@/_components/SendTambolaTickets";
import { TicketService } from "@/network/tickets";

const GenerateTickets = () => {
  const [ticketBinary, setTicketBinary] = useState<string[]>([]);
  const [progressValue, setProgressValue] = useState<number>(100 / 3);
  const [sectionValue, setSectinValue] = useState<number>(1);
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

  const increment = () => {
    setProgressValue((prevValue) => prevValue + 100 / 3);
    setSectinValue((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    setProgressValue((prevValue) => prevValue - 100 / 3);
    setSectinValue((prevValue) => prevValue - 1);
  };

  return (
    <div className="flex-1 container mx-auto py-6 sm:py-12 px-4 sm:px-6">
      <div className="space-y-4 sm:space-y-5">
        <h2 className="text-3xl font-bold mb-5">Welcome to Tambola</h2>

        <Progress
          value={progressValue}
          className="w-full bg-white shadow-sm my-4"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-lg">
            Generate, distribute, and play Tambola tickets online or offline.
          </p>

          <div className="flex gap-2 self-end">
            <Button
              className="mx-1"
              onClick={decrement}
              disabled={progressValue <= 100 / 3}
            >
              Previous
            </Button>
            <Button
              className="mx-1"
              onClick={increment}
              disabled={progressValue === 100}
            >
              Next
            </Button>
          </div>
        </div>
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
