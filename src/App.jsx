import { useEffect } from 'react';
import { db } from './firebaseConfig'; // <-- Import your db
import { doc, getDoc } from 'firebase/firestore';

function App() {

  // 1. THIS LOG IS OUTSIDE
  console.log("App component is RENDERING"); 

  useEffect(() => {
    // 2. THIS LOG IS INSIDE
    console.log("useEffect is RUNNING"); 

    async function checkFirebaseConnection() {
      try {
        const docRef = doc(db, "test-collection", "test-doc");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("FIREBASE CONNECTED: Document data:", docSnap.data());
        } else {
          console.log("FIREBASE CONNECTED: Test document doesn't exist, but we successfully queried the database.");
        }
      } catch (error) {
        console.error("FIREBASE CONNECTION FAILED:", error);
      }
    }

    checkFirebaseConnection();
  }, []); // The empty array [] means this runs only once

  return (
    <div className="App">
      <h1>My App</h1>
      <p>Check the developer console (F12) for the Firebase connection status.</p>
    </div>
  );
}

export default App;