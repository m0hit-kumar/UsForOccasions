"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";


export function CreateRoomDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8">
                Create Room
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Room</DialogTitle>
                    <DialogDescription>
                        Create a room, share link with players and share your screen.
                    </DialogDescription>
                </DialogHeader>
                <Button>Teams</Button>
                <Button onClick={() => window.open("https://meet.google.com/new", '_blank')}>Google Meet</Button>
                <Button>Zoom</Button>
                <Button variant="destructive" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogContent>
        </Dialog>
    )
}
export default CreateRoomDialog;