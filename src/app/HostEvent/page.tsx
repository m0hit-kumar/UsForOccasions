"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { CreateRoomDialog } from "@/_components/CreateRoomDialog";

export default function HostEvent() {
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [previousNumber, setPreviousNumber] = useState<number>(0);
  const [numberToPick, setNumberToPick] = useState<number[]>(
    Array.from(Array(100).keys(), (item) => item + 1)
  );
  const [pickedNumber, setPickedNumber] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.load();
    }
  }, []);

  const generateNumber = () => {
    audioRef.current?.play();
    const newNumber =
      numberToPick[Math.floor(Math.random() * numberToPick.length)];
    setCurrentNumber(newNumber);
    setPreviousNumber(currentNumber);
    setNumberToPick((prevNumbers) =>
      prevNumbers.filter((num) => num !== newNumber)
    );
    setPickedNumber((prevPickedNumbers) => [...prevPickedNumbers, newNumber]);
  };

  const divs = Array.from({ length: 100 }, (_, i) => {
    const isPicked = pickedNumber.includes(i + 1);
    return (
      <div
        key={i + 1}
        id={`div_${i + 1}`}
        className={`border text-center flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 border-cyan-900 ${
          isPicked ? "bg-cyan-400" : ""
        }`}
      >
        {i + 1}
      </div>
    );
  });

  return (
    <div className="flex-1 container mx-auto py-6 px-4 sm:py-12 sm:px-6">
      <h1 className="text-2xl sm:text-4xl mb-5 font-bold">Host Dashboard</h1>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div className="flex flex-col justify-between">
          <div>
            <audio id="mytrack" ref={audioRef}>
              <source src="./generate.mp3" />
            </audio>
            <Button size="lg" onClick={generateNumber}>
              Draw Number
            </Button>

            <div className="flex flex-row sm:flex-col items-center py-4 gap-4 sm:gap-0">
              <div className="flex flex-col items-center">
                <h2 className="pb-3 text-sm sm:text-base">Current Number</h2>
                <div className="border flex justify-center items-center w-10 h-10 border-cyan-900">
                  {currentNumber || "-"}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="pb-3 text-sm sm:text-base">Previous Number</h2>
                <div className="border flex justify-center items-center w-10 h-10 border-cyan-900">
                  {previousNumber || "-"}
                </div>
              </div>
            </div>
          </div>
          <CreateRoomDialog />
        </div>
        <div className="w-full lg:w-[500px] grid grid-cols-10 gap-1 sm:gap-2">
          {divs}
        </div>
      </div>
    </div>
  );
}
