import { NotificationProps, NotificationType } from "./Datatype";

export const NotificationMessage: React.FC<NotificationProps> = ({
  type,
  message,
}) => {
  const bgColor = (type: NotificationType) => {
    if (type === "success") {
      return "bg-green-500";
    } else if (type === "error") {
      return "bg-red-500";
    } else {
      return "bg-blue-500";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor(
        type
      )} text-white p-4 rounded-md shadow-lg z-50 max-w-sm`}
    >
      {message}
    </div>
  );
};
