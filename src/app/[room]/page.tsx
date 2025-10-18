"use client";
import React, { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FillTambolaTicket, handleDownloadImage } from "@/_components/TicketNumberGenerator";
import { X, ArrowLeft, RefreshCw, AlertCircle, Download } from "lucide-react";
import { TicketService } from "@/network/tickets";
import { IRoomStyle } from "@/_components/Datatype";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GameRoom = () => {
  const pathname = usePathname().substring(1);
  const router = useRouter();
  const [numbers, setNumbers] = useState<number[]>([]);
  const [clickedTiles, setClickedTiles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roomNotFound, setRoomNotFound] = useState<boolean>(false);
  const [newRoomCode, setNewRoomCode] = useState<string>("");

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
  const joinNewRoom = (roomCode: string) => {
    if (roomCode.trim()) {
      router.push(`/${roomCode.trim()}`);
    }
  };

  const createRoom = useCallback(async () => {
    console.log('Joining room:', pathname);
    setIsLoading(true);
    setRoomNotFound(false);
    
    // Always fetch fresh design from Firebase (refresh-safe)
    await getTicketFromDB({ roomId: pathname }, (success, error, response) => {
      console.log('Firebase response:', { success, error, response });

      if (success) {
        const data = response.data as IRoomStyle;
        console.log('Room data received:', data);

        // Check if we have a saved ticket for this room
        var savedTicket = getTicketBasedOnRoomId(pathname);
        console.log('Saved ticket from cookies:', savedTicket);

        // Generate new ticket numbers if no saved ticket
        const newTicketNumbers = savedTicket ? savedTicket.ticketNumber : FillTambolaTicket();
        
        const updatedTicket = {
          hostName: data.hostName,
          background: data.background,
          border: data.border,
          text: data.text,
          roomId: data.roomId,
          ticketNumber: newTicketNumbers,
        };

        console.log('Updated ticket:', updatedTicket);
        
        // Save ticket with fresh design (always update design from Firebase)
        saveTicketNumbers(pathname, JSON.stringify(updatedTicket), 4);
        setNumbers(newTicketNumbers as any);
        setRoomStyle(data);
        setIsLoading(false);

      } else if (error) {
        console.error('Error joining room:', error);
        setIsLoading(false);
        setRoomNotFound(true);
        
      }
    });
  }, [pathname, getTicketFromDB, getTicketBasedOnRoomId, saveTicketNumbers, setNumbers, setRoomStyle, setIsLoading, setRoomNotFound]);
  
  useEffect(() => {
    // Only fetch data once when component mounts
    createRoom();
  }, []); // Empty dependency array - runs only once on mount

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
  // Loading State
  if (isLoading) {
    return (
      <div className="flex-1 container mx-auto py-12 px-6 md:px-0">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <RefreshCw className="h-12 w-12 text-white animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Joining Room...</h2>
          <p className="text-white/80 text-center">
            Connecting to room <span className="font-mono font-bold">{pathname}</span>
          </p>
        </div>
      </div>
    );
  }

  // Room Not Found State
  if (roomNotFound) {
    return (
      <div className="flex-1 container mx-auto py-12 px-6 md:px-0">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <AlertCircle className="h-16 w-16 text-red-400 mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Room Not Found</h2>
          <p className="text-white/80 text-center mb-6 max-w-md">
            The room code <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">{pathname}</span> does not exist or has expired.
          </p>
          <div className="w-full max-w-md space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter correct room code"
                value={newRoomCode}
                onChange={(e) => setNewRoomCode(e.target.value)}
                className="flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/60 focus:bg-white/30"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    joinNewRoom(newRoomCode);
                  }
                }}
              />
              <Button
                onClick={() => joinNewRoom(newRoomCode)}
                disabled={!newRoomCode.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-500"
              >
                Join
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State - Show Game Room
  return (
    <div className="p-2 sm:p-4 w-full max-w-3xl mx-auto h-full">
      <div
        id="playerTicket"
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
      
      {/* Download Button - Outside ticket container */}
      <div className="mt-4 text-center">
        <Button
          onClick={() => handleDownloadImage("playerTicket")}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Download My Ticket
        </Button>
      </div>
    </div>
  );
};

export default GameRoom;
