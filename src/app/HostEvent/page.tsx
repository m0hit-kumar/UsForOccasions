"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

import { CreateRoomDialog } from "@/_components/CreateRoomDialog"
export default function HostEvent() {

    const [currentNumber, SetCurrentNumber] = useState<number>(0);
    const [previousNumber, SetPreviousNumber] = useState<number>(0);
    const [numberToPick, setNumberToPick] = useState<number[]>(Array.from(Array(100).keys(), item => item + 1));
    const [pickedNumber, setPickedNumber] = useState<number[]>([]);

    const GenerateNumber = () => {
        const newNumber = (Math.floor(Math.random() * numberToPick.length))
        SetCurrentNumber(newNumber)
        SetPreviousNumber(currentNumber)
        if (newNumber != 0) {
            setNumberToPick((prevState) => prevState.filter((num) => num !== newNumber));
            setPickedNumber([...pickedNumber, newNumber])
        }  
    }


    const divs = [];
    for (let i = 1; i <= 100; i++) {
        const isPicked = pickedNumber.includes(i);

        divs.push(
            <div
                id={`div_${i}`}
                key={i}
                className={`border text-center flex justify-center items-center w-10 h-10 border-cyan-900 ${isPicked ? "bg-cyan-400" : ""}`}
            >
                {i}
            </div>
        );
    }


    return (
        <div className=" c flex-1 container mx-auto py-12 px-6 md:px-0">
            <h1 className="text-4xl mb-5 font-bold">Host Dashboard</h1>
            <div className='flex justify-between'>
                <div className="flex flex-col justify-between">
                    <div>
                        <Button size="lg" onClick={GenerateNumber}>
                            Draw Number
                        </Button>
                        <div className='flex flex-col items-center py-4'>
                            <h1 className='pb-3'>Current Number</h1>
                            <div className='border flex justify-center items-center w-10 h-10 border-cyan-900'>{currentNumber ? currentNumber : "-"}</div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='pb-3'>Previous number</h1>
                            <div className='border flex justify-center items-center w-10 h-10 border-cyan-900'>
                                {previousNumber ? previousNumber : "-"}
                            </div>
                        </div>
                    </div>
                    <CreateRoomDialog />
                </div>
                <div className="w-[500px] grid grid-cols-10 gap-2 ">
                    {divs}
                </div>
            </div>
        </div>
    );
}
