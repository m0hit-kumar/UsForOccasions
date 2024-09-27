import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { TicketStyle } from './Datatype';
import TabolaTicketTemplate from '@/_components/TabolaTicketTemplate';
import { FillTambolaTicket, handleDownloadImage } from '@/_components/TicketNumberGenerator';
import html2canvas from 'html2canvas'
import JSZip from 'jszip';
import { Progress } from '@/components/ui/progress';

interface ITicketGenrator {
  ticketStyle: TicketStyle;
  hostName: string;
  setTicketBinary: React.Dispatch<React.SetStateAction<string[]>>;
}
const TicketGenrator = ({ ticketStyle, hostName, setTicketBinary }: ITicketGenrator) => {

  const [numberOfParticpant, setNumberOfParticpant] = useState<number>(0);
  const [tickets, setTickets] = useState<JSX.Element[]>([]);
  const [ticketsIds, setTicketsIds] = useState<string[]>([])
  const [genrateOn, setGenrateOn] = useState<boolean>(false)
  const [progress, setProgress] = React.useState(0)

  // const setBinaryTicketsValue = async () => {
  //   const ticketsBinary: string[] = [];
  //   const batchSize = 5; // Adjust based on your performance needs and memory constraints

  //   for (let i = 0; i < ticketsIds.length; i += batchSize) {
  //     const ticketBatch = ticketsIds.slice(i, Math.min(i + batchSize, ticketsIds.length));

  //     // Generate images for the current ticket batch in parallel using Promise.all
  //     const imagePromises = ticketBatch.map(async (ticketId) => {
  //       const element = document.getElementById(ticketId);
  //       if (element) {
  //         const canvas = await html2canvas(element);
  //         const data = canvas.toDataURL('image/jpg');
  //         return data.split(",")[1];
  //       } else {
  //         console.error(`Element with ID "${ticketId}" not found.`);
  //         return null; // Handle missing elements gracefully
  //       }
  //     });

  //     // Wait for all promises in the batch to resolve before updating state
  //     const resolvedImages = await Promise.all(imagePromises);

  //     // Filter out any null values (from missing elements) before pushing
  //     ticketsBinary.push(...resolvedImages.filter((image) => image !== null));

  //     console.log("image", i)
  //     setProgress(i)
  //   }

  //   console.log("ticketsBinary", ticketsBinary.length);
  //   await setTicketBinary(ticketsBinary);
  //   if (ticketsIds.length === ticketsBinary.length) {
  //     setGenrateOn(false); // Update generation state after all images are processed
  //   }
  // };

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

  const GenerateTickets = async (nop: number) => {
    setGenrateOn(true)
    const generatedTickets: JSX.Element[] = [];
    const listIds: string[] = [];
    for (let i = 0; i < nop; i++) {
      const ticketid = `ticket${1000 + i}`
      listIds.push(`ticket${1000 + i}`)
      generatedTickets.push(<div className='m-3'>
        <TabolaTicketTemplate key={i} ticketNumbers={FillTambolaTicket()} hostName={hostName} ticketStyle={ticketStyle} ticketId={ticketid} code={`${1000 + i}`} />                <Button onClick={() => handleDownloadImage(ticketid)}>Download Ticket</Button>
      </div>);
    }
    setTicketsIds(listIds)
    setTickets(generatedTickets);
    // await setBinaryTicketsValue();
  }

  return (
    <div>
      <Progress value={progress} className={`fixed top-0 left-0 z-50 flex  h-2 w-screen items-center justify-center bg-gray-900/50 backdrop-blur-sm  ${genrateOn ? '' : 'hidden'}`} />
      <div className="flex w-full max-w-lg items-center space-x-2">
        <Input type="number" placeholder="Number of Participant"
          onChange={(e) => setNumberOfParticpant(parseInt(e.target.value, 10))} />
        <Button onClick={() => GenerateTickets(numberOfParticpant)} type="submit" disabled={genrateOn}>Generate Tickets</Button>
        <Button onClick={downloadAll} type="submit" disabled={numberOfParticpant !== tickets.length || ticketsIds.length === 0} >Download All</Button>
      </div>


      <div className='w-full grid grid-cols-3'>

        {tickets}
      </div>
    </div >
  )
}
export default TicketGenrator;
