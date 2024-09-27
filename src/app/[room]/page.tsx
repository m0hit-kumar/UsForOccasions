"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import TabolaTicketTemplate from "@/_components/TabolaTicketTemplate";
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
    <div className="p-4 max-w-3xl mx-auto h-full ">
      <div
        className={`border-2   p-4 inline-block `}
        style={{
          backgroundColor: ticketStyle.backgroundColor,
          borderColor: ticketStyle.borderColor,
        }}
      >
        <div className="font-bold text-lg mb-4">{pathname.substring(1)}</div>
        <div className="grid grid-cols-9 ">
          {numbers.map((num, index) => (
            <button
              key={`tile-${index}`}
              className="w-12 h-12 border border-gray-300 flex items-center justify-center relative"
              onClick={() => toggleTile(index)}
              style={{ borderColor: ticketStyle.borderColor }}
            >
              <span className="text-sm" style={{ color: ticketStyle.color }}>
                {num}
              </span>
              {clickedTiles.has(`tile-${index}`) && (
                <X className="absolute inset-0 m-auto text-red-500" size={24} />
              )}
            </button>
          ))}
        </div>
        <div className="font-bold text-lg mt-4 text-right">Code:1234</div>
      </div>
    </div>
  );
};

export default DynamicPage;
