import React from 'react'
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 py-4 px-6 border-t">
            <div className="container mx-auto flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-400">© 2024 Tombola. All rights reserved.</p>
                <div className="flex items-center space-x-4">
                    <Link className="text-gray-600 hover:text-primary" href="#">
                        Privacy Policy
                    </Link>
                    <Link className="text-gray-600 hover:text-primary" href="#">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    )
}
