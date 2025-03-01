"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BirdIcon from "./BirdIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AuthDialog from "./AuthDialog";
import HostGameDialog from "./HostGameDialog";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { TicketService } from "@/network/tickets";
import { LogOut } from "lucide-react";

// Define the custom JWT payload interface
interface CustomJwtPayload extends JwtPayload {
  Username: string;
}

export default function Header({
  isLoggedIn,
  setIsLoggedIn,
}: {
  readonly isLoggedIn: boolean;
  readonly setIsLoggedIn: (value: boolean) => void;
}) {
  const { setCookie } = TicketService();
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const getUserName = () => {
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));

      if (cookieValue) {
        const token = cookieValue.split("=")[1]; // Get the token value
        const decoded = jwtDecode<CustomJwtPayload>(token);

        if (decoded.Username) {
          setUsername(decoded.Username);
        }
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
      setUsername(null);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  const handleLogout = () => {
    console.log("logout");
    setIsLoggedIn(false);
    setCookie("token", "", 0);
    router.refresh(); // Redirect to homepage after logout
  };

  return (
    <header className="w-screen bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <BirdIcon className="h-8 w-8 text-primary" />
          <Link href="/" className="text-2xl font-bold ml-2">
            Tombola
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link className="text-gray-600 hover:text-primary" href="/">
            Home
          </Link>
          <HostGameDialog showText={false} />
          <Link
            className="text-gray-600 hover:text-primary"
            href="GenerateTickets"
          >
            Generate Tickets
          </Link>
          <Link className="text-gray-600 hover:text-primary" href="#">
            Offline Play
          </Link>
        </nav>

        {isLoggedIn ? (
          <div className="flex items-center">
            <h1 className="text-gray-600 hover:text-primary pr-1 text-lg font-semibold">
              Welcome, {username}
            </h1>
            <Button onClick={handleLogout} size="sm">
              Logout
            </Button>
          </div>
        ) : (
          <AuthDialog showButton={true} />
        )}
      </div>
    </header>
  );
}
