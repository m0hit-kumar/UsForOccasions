"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { CreateRoomDialog } from "@/_components/CreateRoomDialog";
import { TicketService } from "@/network/tickets";
import { useToast } from "@/hooks/use-toast";
import TabolaTicketTemplate from "@/_components/TabolaTicketTemplate";
import { TicketStyle } from "@/_components/Datatype";
import { useRouter } from "next/navigation";
export default function HostEvent() {
  const router = useRouter();
  const [currentNumber, SetCurrentNumber] = useState<number>(0);
  const [previousNumber, SetPreviousNumber] = useState<number>(0);
  const [numberToPick, setNumberToPick] = useState<number[]>(
    Array.from(Array(100).keys(), (item) => item + 1)
  );
  const [pickedNumber, setPickedNumber] = useState<number[]>([]);
  const [roomCode, setRoomCode] = useState<string>("");
  const [roomLink, setRoomLink] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const { createDefaultTicket, getTicketsLocal } = TicketService();
  const { toast } = useToast();
  
  // Ticket customization data
  const localTicketDesign = getTicketsLocal();
  const defaultTicket = [
    89, 95, 0, 99, 0, 55, 79, 0, 0, 0, 1, 0, 9, 0, 65, 83, 90, 0, 36, 0, 73, 31,
    0, 57, 0, 21, 0,
  ];
  
  const ticketStyle: TicketStyle = {
    backgroundColor: localTicketDesign?.Background ?? "#ffffff",
    borderColor: localTicketDesign?.Border ?? "#000000",
    color: localTicketDesign?.Text ?? "#000000",
  };
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.load();
    }
    
    // Load room info from localStorage if available
    const savedRoomId = localStorage.getItem('currentRoomId');
    const savedRoomLink = localStorage.getItem('currentRoomLink');
    
    if (savedRoomId && savedRoomLink) {
      setRoomCode(savedRoomId);
      setRoomLink(savedRoomLink);
    }
  }, []);

  const GenerateNumber = () => {
    audioRef.current?.play();
    const newNumber =
      numberToPick[Math.floor(Math.random() * numberToPick.length)];
    SetCurrentNumber(newNumber);
    SetPreviousNumber(currentNumber);
    setNumberToPick((prevNumbers) => {
      return prevNumbers.filter((num) => num !== newNumber);
    });
    setPickedNumber((prevPickedNumbers) => {
      return [...prevPickedNumbers, newNumber];
    });
    console.log("numberToPick", numberToPick);
    console.log("pickedNumber", pickedNumber);
  };

  const divs = [];
  for (let i = 1; i <= 100; i++) {
    const isPicked = pickedNumber.includes(i);
    divs.push(
      <div
        key={i}
        id={`div_${i}`}
        className={`border text-center flex justify-center items-center w-10 h-10 font-bold rounded shadow-lg ${
          isPicked 
            ? "bg-green-500 text-white border-green-600" 
            : "bg-white/90 text-black border-gray-300"
        }`}
      >
        {i}
      </div>
    );
  }

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
      
      {/* Room Code Display - Fixed Top Right Corner */}
      {roomCode && (
        <div className="fixed top-4 right-4 p-3 bg-white/90 backdrop-blur-sm border-2 border-green-500 rounded-lg shadow-xl z-50">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Room Code:</p>
            <code className="bg-green-100 px-2 py-1 rounded border border-green-300 text-lg font-mono font-bold text-green-800">
              {roomCode}
            </code>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(roomLink);
                toast({
                  title: "Room link copied!",
                  description: "Share this link with players to join the game.",
                });
              }}
              className="bg-green-600 hover:bg-green-700 text-white mt-1 w-full text-xs"
            >
              📋 Copy Link
            </Button>
          </div>
        </div>
      )}
      
      <h1 className="text-4xl mb-5 font-bold text-white drop-shadow-lg">Host Dashboard</h1>
      
      {/* Game Interface - Only show when playing */}
      <div className="flex justify-between">
        <div className="flex flex-col justify-between">
          <div>
            <audio id="mytrack" ref={audioRef}>
              <source src="./genrate.mp3" />
            </audio>
            <Button size="lg" onClick={GenerateNumber} className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg">
              Draw Number
            </Button>

            <div className="flex flex-col items-center py-4">
              <h1 className="pb-3 text-white font-bold drop-shadow-lg">Current Number</h1>
              <div className="border flex justify-center items-center w-16 h-16 border-white bg-white/90 text-black text-2xl font-bold rounded-lg shadow-lg">
                {currentNumber ? currentNumber : "-"}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="pb-3 text-white font-bold drop-shadow-lg">Previous number</h1>
              <div className="border flex justify-center items-center w-16 h-16 border-white bg-white/90 text-black text-2xl font-bold rounded-lg shadow-lg">
                {previousNumber ? previousNumber : "-"}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[500px] grid grid-cols-10 gap-2 ">{divs}</div>
      </div>
    </div>
  );
}
