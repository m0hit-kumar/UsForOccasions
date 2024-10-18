"use client";

 
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

  const saveTicketsLocal = ({
    hostNameValue,
    backgroundValue,
    borderValue,
    textValue,
  }: TicketsData): void => {
    const ticketsData = {
      HostName: hostNameValue,
      Background: backgroundValue,
      Border: borderValue,
      Text: textValue,
      SystemID: generateUniqueSystemID(),
    };

    setCookie("TicketsData", JSON.stringify(ticketsData), 6); // Store all data in one cookie
    console.log(getTicketsLocal());

    
  };

  const generateUniqueSystemID = (): string => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomNum}`;
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

  return { saveTicketsLocal, getTicketsLocal };
};
