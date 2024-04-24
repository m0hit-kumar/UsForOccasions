
"use client"
import CustomizeTambolaTicket from '@/_components/CustomizeTambolaTicket'
import TicketGenrator from '@/_components/TicketGenrator'
import React, { useRef, useState } from 'react';
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TicketStyle } from '@/_components/Datatype';

const GenerateTickets = () => {
    const printRef = useRef(null);
    const [hostName, setHostName] = useState<string>("HostName");
    const [progressValue, setProgressValue] = useState<number>(100 / 3);
    const [sectionValue, setSectinValue] = useState<number>(1);
    const [ticketStyle, setTicketStyle] = useState<TicketStyle>({ backgroundColor: "#ffffff", borderColor: "#000000", color: "#000000" })
    const increment = () => {
        setProgressValue(prevValue => prevValue + 100 / 3);
        setSectinValue(prevValue => prevValue + 1);
    }
    const decrement = () => {
        setProgressValue(prevValue => prevValue - 100 / 3);
        setSectinValue(prevValue => prevValue - 1);
    }

    return (
        <div
            className='flex-1 container mx-auto py-12 px-6 md:px-0'>
            <h2 className="text-3xl font-bold mb-5">Welcome to Tambola</h2>
            <Progress value={progressValue} className="w-full bg-white shadow-sm my-4" />
            <div className='flex justify-between'>
                <p className="text-lg mb-8">Generate, distribute, and play Tambola tickets online or offline.</p>
                <div>
                    <Button className='mx-1' onClick={decrement} disabled={progressValue <= (100 / 3)}>Previous</Button>
                    <Button className='mx-1' onClick={increment} disabled={progressValue === 100}>Next</Button>
                </div>
            </div>
            <div>
                {sectionValue == 1 && <CustomizeTambolaTicket setTicketStyle={setTicketStyle} ticketStyle={ticketStyle} hostName={hostName} setHostName={setHostName} />}
                {sectionValue == 2 && <TicketGenrator ticketStyle={ticketStyle} hostName={hostName} />}

                {sectionValue == 3 && <div>section3</div>}

            </div>
        </div >
    )
}
export default GenerateTickets;
