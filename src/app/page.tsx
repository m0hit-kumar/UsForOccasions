'use client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import TicketIcon from "@/_components/TicketIcon";
import DownloadIcon from "@/_components/DownloadIcon";
import ShareIcon from "@/_components/ShareIcon";

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex-1 container mx-auto py-12 px-6 md:px-0">
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Play Online</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Click Host Game button to host tambola game.
          </p>
          <Button size="lg" onClick={() => router.push("/HostEvent")} >
            Host Game
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" >
          <h2 className="text-2xl font-bold mb-4">Generate Tickets</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create and distribute Tombola tickets to your friends and family for offline play.
          </p>
          <Button size="lg" onClick={() => router.push("/GenerateTickets")
          } >
            Generate Tickets
          </Button>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">How to Play</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <TicketIcon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Online Play</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Join our online Tombola games and play in real-time with friends and other players.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <DownloadIcon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Offline Play</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Download Tombola tickets and play offline with your friends and family.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <ShareIcon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Ticket Distribution</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Share your Tombola tickets with others via email, messaging apps, or social media.
            </p>
          </div>
        </div>
      </section>
    </main>


  );
}
