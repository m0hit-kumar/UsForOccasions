"use client"
import { Button } from '@/components/ui/button';
import React, { useState, useRef, useEffect } from 'react';
import { CreateRoomDialog } from "@/_components/CreateRoomDialog"
export default function HostEvent() {

    const [currentNumber, SetCurrentNumber] = useState<number>(0);
    const [previousNumber, SetPreviousNumber] = useState<number>(0);
    const [numberToPick, setNumberToPick] = useState<number[]>(Array.from(Array(100).keys(), item => item + 1));
    const [pickedNumber, setPickedNumber] = useState<number[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);
    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.load();
        }
    }, []);

    const GenerateNumber = () => {
        audioRef.current?.play();
        const newNumber = numberToPick[Math.floor(Math.random() * numberToPick.length)]
        SetCurrentNumber(newNumber)
        SetPreviousNumber(currentNumber)
        setNumberToPick(prevNumbers => {
            return prevNumbers.filter(num => num !== newNumber);
        });
        setPickedNumber(prevPickedNumbers => {
            return [...prevPickedNumbers, newNumber];
        });
        console.log("numberToPick", numberToPick)
        console.log("pickedNumber", pickedNumber)

    }


    const divs = [];
    for (let i = 1; i <= 100; i++) {
        const isPicked = pickedNumber.includes(i);
        divs.push(
            <div
                key={i}
                id={`div_${i}`}
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
                        <audio id="mytrack" ref={audioRef}>
                            <source src="./genrate.mp3" />
                        </audio>
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
