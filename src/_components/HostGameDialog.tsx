"use client";

import React, { useEffect, useState } from "react";
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
import TabolaTicketTemplate from "./TabolaTicketTemplate";
import { TicketService } from "@/network/tickets";
import { TicketStyle } from "./Datatype";

const HostGameDialog = ({
  showText = true,
  openDialog = false,
}: {
  showText?: boolean;
  openDialog?: boolean;
}) => {
  const router = useRouter();
  const { getTicketsLocal } = TicketService();
  const defaultTicket = [
    89, 95, 0, 99, 0, 55, 79, 0, 0, 0, 1, 0, 9, 0, 65, 83, 90, 0, 36, 0, 73, 31,
    0, 57, 0, 21, 0,
  ];
  const [open, setOpen] = useState<boolean>(openDialog);
  const localTicketDesign = getTicketsLocal();

  const ticketStyle: TicketStyle = {
    backgroundColor: localTicketDesign?.Background ?? "#ffffff",
    borderColor: localTicketDesign?.Border ?? "#000000",
    color: localTicketDesign?.Text ?? "#000000",
  };
  useEffect(() => {}, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {showText ? (
          <Button size="lg">Host Game</Button>
        ) : (
          <h1 className="text-gray-600 hover:text-primary">Host Game</h1>
        )}
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
          ticketNumbers={defaultTicket}
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
