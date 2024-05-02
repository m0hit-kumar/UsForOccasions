"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
   import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
 
 
const ValidatateSendRequest = (value: any) => {

    // {recipients: '', message: 'vsvsv', sender: 'email@gmail.com'}
    const emailString = value["recipients"].trim();
    const emailList = emailString.split(/\s|,/);
    const filteredEmailsList = emailList.filter((email: string | any[]) => email.length > 0);
    console.log(emailList)
}
interface ISendTambolaTickets {
    ticketBinary: string[]
}
const SendTambolaTickets = ({ ticketBinary }: ISendTambolaTickets) => {
 
    const SendRequest = async (event: any) => {
        event.preventDefault();
        // const data = new FormData(event.target)
        // const entries = Object.fromEntries(data.entries())
        // ValidatateSendRequest(entries)
        //  const login = await instance.acquireTokenSilent(loginRequest);
        // console.log("Logged in login:", login.accessToken);
    }
    return (
        <form onSubmit={SendRequest}>
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <Label className="text-2xl font-bold">Email Recipients {ticketBinary.length}</Label>
                    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                        <Textarea name="recipients"
                            className="h-72 w-full resize-none border-none focus:ring-0 dark:bg-gray-950 dark:text-gray-50"
                            placeholder="Enter email addresses separated by commas or line breaks"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <Label className="text-2xl font-bold">Message</Label>
                    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                        <Textarea name="message"
                            className="h-72 w-full resize-none border-none focus:ring-0 dark:bg-gray-950 dark:text-gray-50"
                            placeholder="Enter your message"
                        />
                    </div>

                </div>
            </div>
            <div className="flex justify-between my-4 ">
                <Input type="email" placeholder="Enter your email" name="sender" className="w-full mr-4 " />
                <Button type="submit">
                    Send
                </Button>
            </div>
        </form>

    )
}
export default SendTambolaTickets;