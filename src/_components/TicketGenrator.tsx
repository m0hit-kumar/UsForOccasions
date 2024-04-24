import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { TicketStyle } from './Datatype';
import TabolaTicketTemplate from '@/_components/TabolaTicketTemplate';
import { FillTambolaTicket } from '@/_components/TicketNumberGenerator';
import html2canvas from 'html2canvas'
import JSZip from 'jszip';

interface ITicketGenrator {
  ticketStyle: TicketStyle;
  hostName: string
}
const TicketGenrator = ({ ticketStyle, hostName }: ITicketGenrator) => {

  const [numberOfParticpant, setNumberOfParticpant] = useState<number>(0);
  const [tickets, setTickets] = useState<JSX.Element[]>([]);
  const [ticketsIds, setTicketsIds] = useState<string[]>([])


  const downloadAll = async () => {
    const zip = new JSZip();

    for (let i = 0; i < ticketsIds.length; i++) {
      const ticketId = ticketsIds[i];
      const element = document.getElementById(ticketId);

      if (element) {
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/jpg');
        const imageBlob = await fetch(data).then((response) => response.blob());

        zip.file(`${ticketId}.jpg`, imageBlob);
      } else {
        console.error(`Element with ID "${ticketId}" not found.`);
      }
    }

    const zipContent = await zip.generateAsync({ type: "blob" });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipContent);
    link.download = 'all_tickets.zip';
    link.click();

    setTimeout(() => URL.revokeObjectURL(link.href), 1000);

  };

  const handleDownloadImage = async (ticketId: string) => {
    const element = document.getElementById(ticketId);
    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/jpg'),
        link = document.createElement('a');

      link.href = data;
      link.download = `${ticketId}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else { console.error('Element with ID "print" not found.'); }

  };



  const GenerateTickets = (nop: number) => {
    const generatedTickets: JSX.Element[] = [];
    const listIds: string[] = [];
    for (let i = 0; i < nop; i++) {
      const ticketid = `ticket${1000 + i}`
      listIds.push(`ticket${1000 + i}`)
      generatedTickets.push(<div className='m-3'><TabolaTicketTemplate key={i} ticketNumbers={FillTambolaTicket()} hostName={hostName} ticketStyle={ticketStyle} ticketId={ticketid} code={`${1000 + i}`} />                <Button onClick={() => handleDownloadImage(ticketid)}>Download Ticket</Button>
      </div>);
    }
    setTicketsIds(listIds)
    setTickets(generatedTickets);
  }
  return (
    <div>
      <div className="flex w-full max-w-lg items-center space-x-2">
        <Input type="number" placeholder="Number of Participant"
          onChange={(e) => setNumberOfParticpant(parseInt(e.target.value, 10))} />
        <Button onClick={() => GenerateTickets(numberOfParticpant)} type="submit">Generate Tickets</Button>
        <Button onClick={downloadAll} type="submit" disabled={numberOfParticpant !== ticketsIds.length || ticketsIds.length === 0} >Download All</Button>
      </div>
      <div className='w-full grid grid-cols-3'>
        {tickets}</div>

    </div >
  )
}
export default TicketGenrator
