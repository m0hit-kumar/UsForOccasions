"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const HostGameDialog = ({
  showText = true,
}: {
  showText?: boolean;
}) => {
  const router = useRouter();

  const handleHostGame = () => {
    // Go to customization page first
    router.push("/CustomizeTicket");
  };

  return (
    <>
      {showText ? (
        <Button 
          size="lg" 
          onClick={handleHostGame}
          className="w-48 bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          CREATE ROOM
        </Button>
      ) : (
        <h1 className="text-white hover:text-gray-300 cursor-pointer" onClick={handleHostGame}>Host Game</h1>
      )}
    </>
  );
};

export default HostGameDialog;