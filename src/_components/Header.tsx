"use client";
import React, { useState } from "react";
import Link from "next/link";
import BirdIcon from "./BirdIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AuthDialog from "./AuthDialog";

export default function Header() {
  const [userEmail, setUserEmail] = useState<string | null>();

  const router = useRouter();
  return (
    <header className=" w-screen bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
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
          <Link className="text-gray-600 hover:text-primary" href="HostEvent">
            Host Event
          </Link>
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
        <AuthDialog />
        {userEmail ? (
          <Button onClick={() => {}} size="sm">
            {userEmail}
          </Button>
        ) : null}
      </div>
    </header>
  );
}
