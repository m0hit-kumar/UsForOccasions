"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TicketStyle } from "@/_components/Datatype";
import { FillTambolaTicket } from "@/_components/TicketNumberGenerator";
import { X } from "lucide-react";
const DynamicPage = () => {
  const pathname = usePathname();
  const [ticketStyle, setTicketStyle] = useState<TicketStyle>({
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    color: "#000000",
  });
  const [numbers, setNumbers] = useState<number[]>([]);
  const [clickedTiles, setClickedTiles] = useState<Set<string>>(new Set());
  useEffect(() => {
    setNumbers(FillTambolaTicket());
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
          backgroundColor: ticketStyle.backgroundColor,
          borderColor: ticketStyle.borderColor,
        }}
      >
        <div className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
          {pathname.substring(1)}
        </div>
        <div className="grid grid-cols-9  ">
          {numbers.map((num, index) => (
            <button
              key={`tile-${index}`}
              className="aspect-square w-full border flex items-center justify-center relative"
              onClick={() => toggleTile(index)}
              style={{ borderColor: ticketStyle.borderColor }}
            >
              <span
                className="text-xs sm:text-sm"
                style={{ color: ticketStyle.color }}
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
        <div className="font-bold text-base sm:text-lg mt-2 sm:mt-4 text-right">
          Code:1234
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;
