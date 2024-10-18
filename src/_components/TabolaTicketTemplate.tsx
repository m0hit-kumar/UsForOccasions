import React, { useRef } from "react";
import { TicketStyle } from "./Datatype";

interface ITabolaTicketTemplate {
  ticketNumbers: number[];
  hostName: string;
  ticketStyle: TicketStyle;
  ticketId: string;
  code: string;
}
const TabolaTicketTemplate = ({
  ticketNumbers,
  hostName,
  ticketStyle,
  ticketId,
  code,
}: ITabolaTicketTemplate) => {
  const divs = [];
  for (let i = 0; i < 27; i++) {
    divs.push(
      <div
        key={i}
        style={ticketStyle}
        className={`border text-center flex justify-center items-center w-10 h-10 border-cyan-900`}
      >
        {ticketNumbers[i] == 0 ? "-" : ticketNumbers[i]}
      </div>
    );
  }
  return (
    <div
      style={ticketStyle}
      id={ticketId}
      className="p-5   border w-[400px] h-[230px] "
    >
      <h1 className="pb-1">{hostName}</h1>
      <div className=" w-[350px] grid grid-cols-9 py-3">{divs}</div>
      <h1 className="text-right">
        <span className="font-bold">Code:</span>#{code}
      </h1>
    </div>
  );
};
export default TabolaTicketTemplate;
