"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FillTambolaTicket } from "@/_components/TicketNumberGenerator";
import { X } from "lucide-react";
import { TicketService } from "@/network/tickets";
import { toast } from "@/hooks/use-toast";
import { IRoomStyle } from "@/_components/Datatype";

const GameRoom = () => {
  const pathname = usePathname().substring(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [clickedTiles, setClickedTiles] = useState<Set<string>>(new Set());

  const {
    getTicketBasedOnRoomId,
    getTicketFromDB,
    setCookie: saveTicketNumbers,
  } = TicketService();
  const [roomStyle, setRoomStyle] = useState<IRoomStyle>({
    hostName: "Host Name",
    background: "#ffffff",
    border: "#000000",
    text: "#000000",
    roomId: "Room Id",
  });
  const createRoom = async () => {
    var savedTicket = getTicketBasedOnRoomId(pathname);
    await getTicketFromDB({ roomId: pathname }, (success, error, response) => {
      if (success) {
        const data = response.data as IRoomStyle;
        const newTicketNumbers = FillTambolaTicket();
        const updatedTicket = {
          hostName: data.hostName,
          background: data.background,
          border: data.border,
          text: data.text,
          roomId: data.roomId,
          ticketNumber: savedTicket
            ? savedTicket.ticketNumber
            : newTicketNumbers,
        };
        saveTicketNumbers(pathname, JSON.stringify(updatedTicket), 4);
        setNumbers(
          savedTicket ? savedTicket.ticketNumber : (newTicketNumbers as any)
        );
        setRoomStyle(data);

        toast({
          title: "Room joined",
          description: "Let play like a pro!",
        });
      } else if (error) {
        toast({
          title: "Try Again!",
          description: "Refresh the page",
        });
      }
    });
  };
  useEffect(() => {
    createRoom();
  }, []);

  const toggleTile = (index: number) => {
    setClickedTiles((prev) => {
      const newSet = new Set(prev);
      const tileId = `tile-${index}`;
      if (newSet.has(tileId)) {
        newSet.delete(tileId);
      } else {
        newSet.add(tileId);
      }
      return newSet;
    });
  };
  return (
    <div className="p-2 sm:p-4 w-full max-w-3xl mx-auto h-full">
      <div
        className="border-2 p-2 sm:p-4 inline-block w-full max-w-full"
        style={{
          backgroundColor: roomStyle?.background,
          borderColor: roomStyle?.border,
        }}
      >
        <div
          className="font-bold text-base sm:text-lg mb-2 sm:mb-4"
          style={{ color: roomStyle?.text }}
        >
          {roomStyle?.hostName}
        </div>
        <div className="grid grid-cols-9  ">
          {numbers?.map((num, index) => (
            <button
              key={`tile-${index}`}
              className="aspect-square w-full border flex items-center justify-center relative"
              onClick={() => toggleTile(index)}
              style={{ borderColor: roomStyle?.border }}
            >
              <span
                className="text-xs sm:text-sm"
                style={{ color: roomStyle?.text }}
              >
                {num == 0 ? "-" : num}
              </span>
              {clickedTiles.has(`tile-${index}`) && num != 0 && (
                <X
                  className="absolute inset-0 m-auto text-red-500"
                  size="75%"
                />
              )}
            </button>
          ))}
        </div>
        <div
          className="font-bold text-base sm:text-lg mt-2 sm:mt-4 text-right"
          style={{ color: roomStyle?.text }}
        >
          {`Room ID : ${roomStyle?.roomId}`}
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
