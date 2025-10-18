"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import TabolaTicketTemplate from "./TabolaTicketTemplate";
import { TicketService } from "@/network/tickets";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { TicketStyle } from "./Datatype";
import HostGameDialog from "./HostGameDialog";

interface ICustomizeTambolaTicket {
  setTicketStyle: React.Dispatch<React.SetStateAction<TicketStyle>>;
  ticketStyle: TicketStyle;
  hostName: string;
  setHostName: React.Dispatch<React.SetStateAction<string>>;
}

const CustomizeTambolaTicket = ({
  setTicketStyle,
  setHostName,
  hostName,
  ticketStyle,
}: ICustomizeTambolaTicket) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const { createRoom, saveTicketsLocal } = TicketService();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBackgroundColorChange = (newColor: string) => {
    setTicketStyle({
      ...ticketStyle,
      backgroundColor: newColor,
    });
  };

  const handleTextColorChange = (newColor: string) => {
    setTicketStyle({
      ...ticketStyle,
      color: newColor,
    });
  };

  const handleBorderColorChange = (newColor: string) => {
    setTicketStyle({
      ...ticketStyle,
      borderColor: newColor,
    });
  };

  const handleDownloadImage = async (ticketId: string) => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      const element = document.getElementById(ticketId);

      if (element) {
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");
        link.href = data;
        link.download = "SampleTicket.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  // Return null or loading state while client-side rendering is happening
  if (!isMounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Preview Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="printme" id="sampleTicket">
            <TabolaTicketTemplate
              ticketNumbers={[
                89, 95, 0, 99, 0, 55, 79, 0, 0, 0, 1, 0, 9, 0, 65, 83, 90, 0,
                36, 0, 73, 31, 0, 57, 0, 21, 0,
              ]}
              hostName={hostName}
              ticketStyle={ticketStyle}
              ticketId={"sampleTicket"}
              code={"1234"}
            />
          </div>
          
          {/* Download Sample Button Below Preview */}
          <div className="mt-6 text-center">
            <Button
              onClick={() => handleDownloadImage("sampleTicket")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3"
            >
              Download Sample
            </Button>
            <p className="text-sm text-white mt-2 max-w-xs">
              Press to download sample ticket
            </p>
          </div>
        </div>

        {/* Customization Controls Section */}
        <div className="w-full lg:w-1/2">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h1 className="text-xs	text-red-600">
                  * Don&apos;t forget to save ticket after customization
                </h1>

                <Label htmlFor="hostname">Host Name</Label>

                <Input
                  id="hostname"
                  maxLength={30}
                  onChange={(e) => setHostName(e.target.value)}
                  value={hostName}
                  placeholder="Enter host name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    onChange={(e) =>
                      handleBackgroundColorChange(e.target.value)
                    }
                    value={ticketStyle.backgroundColor}
                    type="color"
                    className="w-20"
                  />
                  <Input
                    value={ticketStyle.backgroundColor}
                    onChange={(e) =>
                      handleBackgroundColorChange(e.target.value)
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="borderColor">Border Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="borderColor"
                    onChange={(e) => handleBorderColorChange(e.target.value)}
                    value={ticketStyle.borderColor}
                    type="color"
                    className="w-20"
                  />
                  <Input
                    value={ticketStyle.borderColor}
                    onChange={(e) => handleBorderColorChange(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    onChange={(e) => handleTextColorChange(e.target.value)}
                    value={ticketStyle.color}
                    type="color"
                    className="w-20"
                  />
                  <Input
                    value={ticketStyle.color}
                    onChange={(e) => handleTextColorChange(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    // Save design locally using the proper TicketService function
                    saveTicketsLocal({
                      hostNameValue: hostName,
                      backgroundValue: ticketStyle.backgroundColor,
                      borderValue: ticketStyle.borderColor,
                      textValue: ticketStyle.color,
                    });
                    
                    // Then navigate to download page
                    router.push("/GenerateTickets?skipCustomize=true");
                  }}
                >
                  Save Design & Download for Offline Play
                </Button>
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => {
                    createRoom(
                      {
                        textValue: ticketStyle.color,
                        backgroundValue: ticketStyle.backgroundColor,
                        borderValue: ticketStyle.borderColor,
                        hostNameValue: hostName,
                      },
                      (success, error, response) => {
                        if (success) {
                          const roomId = response.roomId;
                          const roomLink = `${window.location.origin}/${roomId}`;
                          
                          // Save room info to localStorage for HostEvent page
                          localStorage.setItem('currentRoomId', roomId);
                          localStorage.setItem('currentRoomLink', roomLink);
                          
                          toast({
                            title: "Room created successfully!",
                            description: `Redirecting to game...`,
                          });
                          
                          // Navigate to HostEvent page
                          router.push("/HostEvent");
                        } else {
                          toast({
                            title: "Try Again!",
                            description: "Ticket design was not saved.",
                          });
                        }
                      }
                    );
                  }}
                >
                  Save & Start Online Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Export the component with no SSR
export default dynamic(() => Promise.resolve(CustomizeTambolaTicket), {
  ssr: false,
});
