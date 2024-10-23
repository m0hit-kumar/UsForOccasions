"use client";

import { TicketsData } from "@/_components/Datatype";
import axios from "axios";

export const TicketService = () => {
  const setCookie = (name: string, value: string, hours: number): void => {
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

  // Network calls

  const URL = "http://localhost:8080/api";

  const saveTicketToDB = (
    { hostNameValue, backgroundValue, borderValue, textValue }: TicketsData,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    var ticket = saveTicketsLocal({
      hostNameValue,
      backgroundValue,
      borderValue,
      textValue,
    });
    axios({
      method: "post",
      withCredentials: true,
      url: `${URL}/create_ticketDesign`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        hostName: ticket.HostName,
        background: ticket.Background,
        border: ticket.Border,
        text: ticket.Text,
        roomId: ticket.SystemID,
      },
    })
      .then((response) => {
        callback(true, null, response.data);
      })
      .catch((error) => {
        callback(false, error);
      });
  };
  const getTicketFromDB = (
    { roomId }: any,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    axios({
      method: "get",
      url: `${URL}/ticketDesign/${roomId}`,
      withCredentials: true,
    })
      .then((response) => {
        callback(true, null, response.data);
      })
      .catch((error) => {
        callback(false, error);
      })
      .finally(() => console.log("Room joined"));
  };

  return {
    saveTicketsLocal,
    getTicketsLocal,
    generateUniqueRoomID,
    saveTicketToDB,
    getTicketFromDB,
    getTicketBasedOnRoomId,
    setCookie,
  };
};
