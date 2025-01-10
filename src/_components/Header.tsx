"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import BirdIcon from './BirdIcon'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"
import { loginRequest } from "../graphApi/authConfig"


export default function Header() {
    const [userEmail, setUserEmail] = useState<string | null>();
    const { instance } = useMsal();
    const LogIn = () => {
        instance.loginPopup({
            ...loginRequest,
            prompt: "create"
        })

            .catch((error: any) =>
                console.error(error)
            )
            .then(async (response) => {
                if (response) {
                    setUserEmail(response.account.username);
                }
            }
            );
    }
    const LogOut = () => {
        instance.logoutPopup().catch((error) => console.error(error))
    }
    const router = useRouter()
    return (
        <header className=" w-screen bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <BirdIcon className="h-8 w-8 text-primary" />
                    <Link href="/" className="text-2xl font-bold ml-2">Tambola</Link>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link className="text-gray-600 hover:text-primary" href="/">
                        Home
                    </Link>
                    <Link className="text-gray-600 hover:text-primary" href="HostEvent">
                        Host Event
                    </Link>
                    <Link className="text-gray-600 hover:text-primary" href="GenerateTickets">
                        Generate Tickets
                    </Link>
                    <Link className="text-gray-600 hover:text-primary" href="#">
                        Offline Play
                    </Link>
                </nav>
                <UnauthenticatedTemplate>
                    <Button onClick={LogIn} size="sm"  >
                        Login
                    </Button>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                    {
                        userEmail ? (<Button onClick={LogOut} size="sm"  >
                            {userEmail}
                        </Button>) : null}
                </AuthenticatedTemplate>
            </div>
        </header>
    )
}


