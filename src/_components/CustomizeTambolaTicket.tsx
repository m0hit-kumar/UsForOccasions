import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import html2canvas from "html2canvas";
import React, { useState } from "react";
import { TicketStyle } from "./Datatype";
import TabolaTicketTemplate from "@/_components/TabolaTicketTemplate";

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
    const element = document.getElementById(ticketId);

    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/jpg"),
        link = document.createElement("a");

      link.href = data;
      link.download = "SampleTicket.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Element with ID "print" not found.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div className="printme">
        <TabolaTicketTemplate
          ticketNumbers={[
            89, 95, 0, 99, 0, 55, 79, 0, 0, 0, 1, 0, 9, 0, 65, 83, 90, 0, 36, 0,
            73, 31, 0, 57, 0, 21, 0,
          ]}
          hostName={hostName}
          ticketStyle={ticketStyle}
          ticketId={"sampleTicket"}
          code={"1234"}
        />
      </div>
      <div className="mt-10  lg:mt-0 lg:pl-[300px] w-screen flex flex-col justify-between">
        <Label>HostName</Label>
        <Input
          maxLength={30}
          onChange={(e) => setHostName(e.target.value)}
          value={hostName}
          className="my-3"
          placeholder="HostName"
        />
        <Label>Background</Label>
        <Input
          id="backgroundColor"
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
          value={ticketStyle.backgroundColor}
          className="my-3"
          type="color"
        />

        <Label>Border</Label>
        <Input
          id="borderColor"
          onChange={(e) => handleBorderColorChange(e.target.value)}
          value={ticketStyle.borderColor}
          className="my-3"
          type="color"
        />
        <Label>Text</Label>
        <Input
          id="textColor"
          onChange={(e) => handleTextColorChange(e.target.value)}
          value={ticketStyle.color}
          className="my-3"
          type="color"
        />
        <Button onClick={() => handleDownloadImage("sampleTicket")}>
          Download Sample
        </Button>
      </div>
    </div>
  );
};

export default CustomizeTambolaTicket;
