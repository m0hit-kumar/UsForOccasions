import React from 'react'
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-transparent py-4 px-6">
            <div className="container mx-auto flex items-center justify-between">
                <p className="text-white font-semibold">© 2024 Tambola. All rights reserved.</p>
                <div className="flex items-center space-x-6">
                    <Link className="text-white hover:text-gray-300 font-semibold transition-colors" href="#">
                        Privacy Policy
                    </Link>
                    <Link className="text-white hover:text-gray-300 font-semibold transition-colors" href="#">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    )
}
