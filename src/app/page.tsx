"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TicketIcon from "@/_components/TicketIcon";
import DownloadIcon from "@/_components/DownloadIcon";
import ShareIcon from "@/_components/ShareIcon";
import HostGameDialog from "@/_components/HostGameDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
// AUTHENTICATION DISABLED - Uncomment below to re-enable authentication
// import InfoBox from "@/_components/InfoBox";

export default function Home() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const { toast } = useToast();

  const handleJoinGame = () => {
    if (!roomCode.trim()) {
      toast({
        title: "Room code required",
        description: "Please enter a room code to join the game.",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to the room
    router.push(`/${roomCode.trim()}`);
  };

  return (
    <main className="flex-1 relative">
      {/* Main content */}
      <div className="relative z-10 container mx-auto py-16 px-6 md:px-0">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Tambola Online: Your Next Game Night Starts Now
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Play for Fun, Win Big with Friends & Family Anywhere
            </p>
          </div>
          
          {/* Action buttons - Left and Right alignment */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16 max-w-6xl mx-auto">
            {/* Left side - CREATE ROOM */}
            <div className="flex flex-col items-start">
              <HostGameDialog showText={true} />
            </div>
            
            {/* Right side - JOIN GAME */}
            <div className="flex flex-col items-end">
              <div className="space-y-3">
                <Input
                  placeholder="Enter room code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="w-48 bg-white border-2 border-white rounded-lg px-4 py-3 text-center font-semibold text-gray-800 placeholder-gray-600"
                />
                <Button 
                  size="lg" 
                  onClick={handleJoinGame}
                  className="w-48 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg"
                >
                  JOIN GAME
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Modes Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Game Modes</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Real-Time Online */}
            <div className="bg-white rounded-xl p-6 py-12 shadow-xl h-80 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Real-Time Online</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-center">
                  Play with friends and global players instantly. Auto-call, pure daub fun!
                </p>
              </div>
              <div className="flex justify-center">
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Play Now
                </Button>
              </div>
            </div>

            {/* Generate & Print Tickets */}
            <div className="bg-orange-500 rounded-xl p-6 py-12 shadow-xl h-80 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-white">🖨️</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">Generate & Print Tickets</h3>
                <p className="text-white/90 mb-6 leading-relaxed text-center">
                  Download free, customizable tickets for your physical game night
                </p>
              </div>
              <div className="flex justify-center">
                <Button 
                  size="sm" 
                  onClick={() => router.push("/GenerateTickets")}
                  className="bg-orange-700 hover:bg-orange-800 text-white font-bold"
                >
                  Download Now
                </Button>
              </div>
            </div>

            {/* How-To Guide */}
            <div className="bg-blue-600 rounded-xl p-6 py-12 shadow-xl h-80 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-white">📖</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">How-To Guide</h3>
                <p className="text-white/90 mb-6 leading-relaxed text-center">
                  New to Tambola? Learn all the hints and strategy in minutes!
                </p>
              </div>
              <div className="flex justify-center">
                <Button 
                  size="sm" 
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold"
                >
                  Watch Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
