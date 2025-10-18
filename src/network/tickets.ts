"use client";

import { TicketsData } from "@/_components/Datatype";
import { FirebaseService } from "./firebaseService";

export const TicketService = () => {
  const setCookie = (name: string, value: string, hours: number): void => {
    // Check if we're on the client side
    if (typeof window === "undefined") {
      return;
    }
    
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; ${expires}; path=/`;
  };

  const generateUniqueRoomID = (): string => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueID = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters[randomIndex];
    }
    return uniqueID;
  };

  const getTicketsLocal = (): { [key: string]: string } | null => {
    // Check if we're on the client side
    if (typeof window === "undefined") {
      return null;
    }
    
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("TicketsData="));
    if (cookieValue) {
      const jsonString = decodeURIComponent(cookieValue.split("=")[1]);
      return JSON.parse(jsonString);
    }
    return null;
  };

  const getTicketBasedOnRoomId = (
    roomId: string
  ): { [key: string]: string } | null => {
    // Check if we're on the client side
    if (typeof window === "undefined") {
      return null;
    }
    
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${roomId}=`));
    if (cookieValue) {
      const jsonString = decodeURIComponent(cookieValue.split("=")[1]);
      return JSON.parse(jsonString);
    }
    return null;
  };

  const saveTicketsLocal = ({
    hostNameValue,
    backgroundValue,
    borderValue,
    textValue,
  }: TicketsData): any => {
    const existingTickets = getTicketsLocal();

    const ticketsData = {
      HostName: hostNameValue,
      Background: backgroundValue,
      Border: borderValue,
      Text: textValue,
      SystemID: existingTickets
        ? existingTickets.SystemID
        : generateUniqueRoomID(),
    };

    setCookie("TicketsData", JSON.stringify(ticketsData), 6);
    return ticketsData;
  };

  // Firebase service
  const firebaseService = FirebaseService();

  const saveTicketToDB = (
    { hostNameValue, backgroundValue, borderValue, textValue }: TicketsData,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    // Save to local storage first
    var ticket = saveTicketsLocal({
      hostNameValue,
      backgroundValue,
      borderValue,
      textValue,
    });

    // Save to Firebase
    firebaseService.saveTicketDesign(
      { hostNameValue, backgroundValue, borderValue, textValue },
      callback
    );
  };

  const getTicketFromDB = (
    { roomId }: any,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    firebaseService.getRoomData(roomId, callback);
  };

  const createRoom = (
    { hostNameValue, backgroundValue, borderValue, textValue }: TicketsData,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    // Save to local storage first
    var ticket = saveTicketsLocal({
      hostNameValue,
      backgroundValue,
      borderValue,
      textValue,
    });

    // Create room in Firebase
    firebaseService.createRoom(
      { hostNameValue, backgroundValue, borderValue, textValue },
      callback
    );
  };

  const createDefaultTicket = (
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    firebaseService.createDefaultTicket(callback);
  };

  return {
    saveTicketsLocal,
    getTicketsLocal,
    generateUniqueRoomID,
    saveTicketToDB,
    getTicketFromDB,
    getTicketBasedOnRoomId,
    setCookie,
    createRoom,
    createDefaultTicket,
  };
};
