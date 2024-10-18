"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const HostGameDialog = () => {
  const router = useRouter();
  const defaultTicket = [
    [1, 15, 0, 37, 49, 0, 68, 72, 90],
    [5, 0, 22, 39, 0, 59, 0, 79, 0],
    [0, 18, 26, 0, 53, 62, 70, 0, 88],
  ];
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Host Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Private Room</DialogTitle>
          <DialogDescription>
            This is the default ticket that will be sent to everyone. You can
            customize it or use as is.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Card className="w-full max-w-[300px] mx-auto">
            <CardContent className="p-2">
              <table className="w-full border-collapse">
                <tbody>
                  {defaultTicket.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((number, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-300 p-2 text-center"
                        >
                          {number !== 0 ? number : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/GenerateTickets")}
          >
            Customize Ticket
          </Button>
          <Button type="submit" onClick={() => router.push("/HostEvent")}>
            Create Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HostGameDialog;
