"use client";
import { useState } from 'react';
import { TicketService } from '@/network/tickets';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function RoomTest() {
  const [roomId, setRoomId] = useState('');
  const [roomData, setRoomData] = useState(null);
  const [logs, setLogs] = useState<string[]>([]);
  const { createRoom, getTicketFromDB, getTicketsLocal } = TicketService();
  const { toast } = useToast();

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testCreateRoom = () => {
    const localTicketDesign = getTicketsLocal();
    
    // Use local design if available, otherwise use defaults
    const ticketData = localTicketDesign ? {
      hostNameValue: localTicketDesign.HostName || "Host Name",
      backgroundValue: localTicketDesign.Background || "#ffffff",
      borderValue: localTicketDesign.Border || "#000000",
      textValue: localTicketDesign.Text || "#000000",
    } : {
      hostNameValue: "Host Name",
      backgroundValue: "#ffffff",
      borderValue: "#000000",
      textValue: "#000000",
    };

    if (localTicketDesign) {
      addLog('✅ Using custom ticket design');
    } else {
      addLog('✅ Using default ticket design');
    }
    
    addLog(`Host Name: ${ticketData.hostNameValue}`);
    addLog(`Background: ${ticketData.backgroundValue}`);
    addLog(`Border: ${ticketData.borderValue}`);
    addLog(`Text: ${ticketData.textValue}`);

    createRoom(ticketData, (success, error, response) => {
      if (success) {
        const roomId = response.roomId;
        addLog(`✅ Room created successfully! Room ID: ${roomId}`);
        setRoomId(roomId);
        
        toast({
          title: "Room created successfully!",
          description: `Room ID: ${roomId}`,
        });
      } else {
        addLog(`❌ Room creation failed: ${error?.message || 'Unknown error'}`);
        toast({
          title: "Failed to create room",
          description: error?.message || "Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  const testJoinRoom = () => {
    if (!roomId) {
      addLog('❌ No room ID to test');
      return;
    }

    addLog(`Testing join room: ${roomId}`);
    
    getTicketFromDB({ roomId }, (success, error, response) => {
      if (success) {
        addLog('✅ Room data retrieved successfully');
        addLog(`Host Name: ${response.data.hostName}`);
        addLog(`Background: ${response.data.background}`);
        addLog(`Border: ${response.data.border}`);
        addLog(`Text: ${response.data.text}`);
        setRoomData(response.data);
      } else {
        addLog(`❌ Failed to get room data: ${error?.message || 'Unknown error'}`);
      }
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Room Flow Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Test Room Creation</h2>
          <Button onClick={testCreateRoom} className="w-full">
            Create Room
          </Button>
          
          {roomId && (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg">
              <p className="font-semibold">Room Created:</p>
              <p>Room ID: {roomId}</p>
              <p>Link: <a href={`/${roomId}`} target="_blank" className="underline">{window.location.origin}/{roomId}</a></p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Test Room Joining</h2>
          <Button onClick={testJoinRoom} className="w-full" disabled={!roomId}>
            Test Join Room
          </Button>
          
          {roomData && (
            <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
              <p className="font-semibold">Room Data:</p>
              <pre className="text-xs mt-2">{JSON.stringify(roomData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Test Logs:</h2>
        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
