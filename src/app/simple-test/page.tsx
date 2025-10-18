"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';

export default function SimpleFirebaseTest() {
  const [status, setStatus] = useState('Testing...');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const testFirebase = async () => {
      try {
        addLog('Starting Firebase test...');
        
        // Test 1: Try to read from a collection
        addLog('Test 1: Reading from collection...');
        const testCollection = collection(db, 'test');
        const snapshot = await getDocs(testCollection);
        addLog(`✅ Read test passed. Found ${snapshot.size} documents.`);
        
        // Test 2: Try to write a document
        addLog('Test 2: Writing to collection...');
        const docRef = await addDoc(collection(db, 'test'), {
          message: 'Firebase test successful',
          timestamp: new Date().toISOString(),
          testId: Math.random().toString(36).substr(2, 9)
        });
        addLog(`✅ Write test passed. Document ID: ${docRef.id}`);
        
        // Test 3: Try to write to rooms collection
        addLog('Test 3: Testing rooms collection...');
        const roomId = 'test123';
        const roomRef = doc(db, 'rooms', roomId);
        await setDoc(roomRef, {
          roomId: roomId,
          hostName: 'Test Host',
          background: '#ffffff',
          border: '#000000',
          text: '#000000',
          createdAt: new Date().toISOString(),
          isActive: true
        });
        addLog('✅ Rooms collection test passed.');
        
        setStatus('✅ All Firebase tests passed! Your app is ready.');
        
      } catch (error) {
        console.error('Firebase test error:', error);
        addLog(`❌ Error: ${error.message}`);
        addLog(`❌ Error code: ${error.code || 'Unknown'}`);
        setStatus(`❌ Firebase test failed: ${error.message}`);
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Simple Firebase Test</h1>
      
      <div className="mb-4 p-4 rounded-lg bg-gray-100">
        <p className="font-semibold">Status: {status}</p>
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Test Logs:</h2>
        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
        <p className="font-semibold">If tests fail, check:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Firestore Database is enabled in Firebase Console</li>
          <li>Security rules are set to: <code>allow read, write: if true;</code></li>
          <li>You're in the correct project: "bring-the-menu"</li>
          <li>Rules were published after changes</li>
        </ul>
      </div>
    </div>
  );
}
