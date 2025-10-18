"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Testing Firebase connection...');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        // Test Firestore connection by trying to read from a collection
        const testCollection = collection(db, 'test');
        const snapshot = await getDocs(testCollection);
        
        setStatus('✅ Firebase connected successfully!');
        setIsConnected(true);
        
        // Try to write a test document
        await addDoc(collection(db, 'test'), {
          message: 'Firebase test successful',
          timestamp: new Date().toISOString()
        });
        
        setStatus('✅ Firebase read/write test successful!');
      } catch (error) {
        console.error('Firebase test error:', error);
        let message = 'Unknown error';
        if (error instanceof Error) {
          message = error.message;
        }
        if (typeof message === 'string' && message.includes('permissions')) {
          setStatus('❌ Firebase permissions error. Please update Firestore rules.');
        } else {
          setStatus(`❌ Firebase error: ${message}`);
        }
        setIsConnected(false);
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Firebase Test</h1>
      <div className={`p-4 rounded-lg ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        <p className="font-semibold">Status:</p>
        <p>{status}</p>
      </div>
      
      {isConnected && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
          <p className="font-semibold">Next Steps:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Go to <a href="/GenerateTickets" className="underline">Generate Tickets</a> to customize a ticket</li>
            <li>Go to <a href="/HostEvent" className="underline">Host Event</a> to create a room</li>
            <li>Test the room creation and joining flow</li>
          </ol>
        </div>
      )}
      
      {!isConnected && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          <p className="font-semibold">Fix Required:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Go to <a href="https://console.firebase.google.com/" target="_blank" className="underline">Firebase Console</a></li>
            <li>Select "bring-the-menu" project</li>
            <li>Go to "Firestore Database" → "Rules"</li>
            <li>Replace rules with: <code className="bg-gray-200 px-1 rounded">allow read, write: if true;</code></li>
            <li>Click "Publish"</li>
            <li>Refresh this page</li>
          </ol>
        </div>
      )}
    </div>
  );
}
