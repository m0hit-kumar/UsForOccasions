"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import TabolaTicketTemplate from "./TabolaTicketTemplate";
import { TicketService } from "@/network/tickets";
import { TicketStyle } from "./Datatype";

const HostGameDialog = () => {
  const router = useRouter();
  const {
    saveTicketsLocal,
    getTicketsLocal,
    saveTicketToDB,
    generateUniqueRoomID,
  } = TicketService();
  const defaultTicket = [
    [1, 15, 0, 37, 49, 0, 68, 72, 90],
    [5, 0, 22, 39, 0, 59, 0, 79, 0],
    [0, 18, 26, 0, 53, 62, 70, 0, 88],
  ];
  const [open, setOpen] = useState<boolean>(false);
  const localTicketDesign = getTicketsLocal();

  const ticketStyle: TicketStyle = {
    backgroundColor: localTicketDesign?.Background ?? "#ffffff",
    borderColor: localTicketDesign?.Border ?? "#000000",
    color: localTicketDesign?.Text ?? "#000000",
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Host Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Create Private Room</DialogTitle>
          <DialogDescription>
            This is the default ticket that will be sent to everyone. You can
            customize it or use as is.
          </DialogDescription>
        </DialogHeader>

        <TabolaTicketTemplate
          ticketNumbers={[
            89, 95, 0, 99, 0, 55, 79, 0, 0, 0, 1, 0, 9, 0, 65, 83, 90, 0, 36, 0,
            73, 31, 0, 57, 0, 21, 0,
          ]}
          hostName={localTicketDesign?.HostName ?? "HostName"}
          ticketStyle={ticketStyle}
          ticketId={"sampleTicket"}
          code={"1234"}
        />

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/GenerateTickets")}
          >
            Customize Ticket
          </Button>
          <Button type="submit" onClick={() => router.push("/HostEvent")}>
            Create Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HostGameDialog;
