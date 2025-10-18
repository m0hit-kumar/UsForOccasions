"use client";

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TicketsData } from '@/_components/Datatype';

export const FirebaseService = () => {
  
  // Save ticket design to Firestore (for customization)
  const saveTicketDesign = async (
    ticketData: TicketsData,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    try {
      const ticketRef = doc(db, 'ticketDesigns', ticketData.hostNameValue || 'default');
      
      await setDoc(ticketRef, {
        hostName: ticketData.hostNameValue,
        background: ticketData.backgroundValue,
        border: ticketData.borderValue,
        text: ticketData.textValue,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      callback(true, null, { 
        message: 'Ticket design saved successfully',
        id: ticketRef.id 
      });
    } catch (error) {
      console.error('Error saving ticket design:', error);
      callback(false, error);
    }
  };

  // Create a new room with ticket design
  const createRoom = async (
    ticketData: TicketsData,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    try {
      // Generate a unique room ID (5 characters)
      const roomId = generateRoomId();
      
      const roomRef = doc(db, 'rooms', roomId);
      await setDoc(roomRef, {
        roomId: roomId,
        hostName: ticketData.hostNameValue,
        background: ticketData.backgroundValue,
        border: ticketData.borderValue,
        text: ticketData.textValue,
        createdAt: serverTimestamp(),
        isActive: true,
        playerCount: 0
      });

      callback(true, null, { 
        message: 'Room created successfully',
        roomId: roomId,
        data: {
          hostName: ticketData.hostNameValue,
          background: ticketData.backgroundValue,
          border: ticketData.borderValue,
          text: ticketData.textValue,
          roomId: roomId
        }
      });
    } catch (error) {
      console.error('Error creating room:', error);
      callback(false, error);
    }
  };

  // Get room data by room ID
  const getRoomData = async (
    roomId: string,
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    try {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        const data = roomSnap.data();
        callback(true, null, { 
          data: {
            hostName: data.hostName,
            background: data.background,
            border: data.border,
            text: data.text,
            roomId: data.roomId
          }
        });
      } else {
        callback(false, new Error('Room not found'));
      }
    } catch (error) {
      console.error('Error getting room data:', error);
      callback(false, error);
    }
  };

  // Generate a unique 5-character room ID
  const generateRoomId = (): string => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueID = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters[randomIndex];
    }
    return uniqueID;
  };

  // Create default ticket design
  const createDefaultTicket = async (
    callback: (success: boolean, error?: any, response?: any) => void
  ) => {
    try {
      const roomId = generateRoomId();
      const roomRef = doc(db, 'rooms', roomId);
      
      await setDoc(roomRef, {
        roomId: roomId,
        hostName: "Host Name",
        background: "#ffffff",
        border: "#000000",
        text: "#000000",
        createdAt: serverTimestamp(),
        isActive: true,
        playerCount: 0,
        isDefault: true
      });

      callback(true, null, { 
        message: 'Default ticket created successfully',
        roomId: roomId,
        data: {
          hostName: "Host Name",
          background: "#ffffff",
          border: "#000000",
          text: "#000000",
          roomId: roomId
        }
      });
    } catch (error) {
      console.error('Error creating default ticket:', error);
      callback(false, error);
    }
  };

  return {
    saveTicketDesign,
    createRoom,
    getRoomData,
    generateRoomId,
    createDefaultTicket
  };
};
