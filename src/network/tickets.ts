"use client";

import axios from "axios";

interface TicketsData {
  hostNameValue: string;
  backgroundValue: string;
  borderValue: string;
  textValue: string;
}

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
    { email, username, password }: any,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    axios({
      method: "post",
      url: `${URL}/signup`,
      data: {
        username: username,
        password: password,
        email: email,
      },
    })
      .then((response) => {
        callback(true, null, response.data);
      })
      .catch((error) => {
        callback(false, error);
      })
      .finally(() => console.log("Ticket Saved to Cloud"));
  };

  return {
    saveTicketsLocal,
    getTicketsLocal,
    generateUniqueRoomID,
    saveTicketToDB,
    getTicketFromDB,
  };
};
