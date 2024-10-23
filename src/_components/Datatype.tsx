export type TicketStyle = {
  backgroundColor: string;
  borderColor: string;
  color: string;
};
export type IRoomStyle = {
  hostName: string;
  background: string;
  border: string;
  text: string;
  roomId: string;
};

export interface TicketsData {
  hostNameValue: string;
  backgroundValue: string;
  borderValue: string;
  textValue: string;
}

export type NotificationType = "success" | "error" | "info" | null;

export interface NotificationProps {
  type: NotificationType;
  message: string;
}
