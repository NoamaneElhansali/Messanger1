import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// Initialiser Firebase
const firebaseConfig = {
  // Vos configurations Firebase ici
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Vérification de session basée sur les cookies
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (!email || !password) {
      // Si les cookies ne sont pas définis, rediriger vers la page de connexion
      window.location.href = "login.html";
    }

    async function fetchData() {
      const data = [];
      const querySnapshot = await getDocs(collection(db, "User"));
      querySnapshot.forEach((doc) => {
        if (doc.data().ID !== getCookie("UTID")) {
          data.push(doc.data());
        }
      });
      setUserData(data);
    }

    fetchData();
  }, []);

  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    const id = generateRandomId(8);
    const ref = doc(db, "Message", id);
    const currentDate = new Date();
    const datenew1 = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}`;
    const Timenew1 = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    await setDoc(ref, {
      IdMessage: id,
      UserEnvoye: getCookie("UTID"),
      UserEmetteur: userId,
      DateEnvoye: datenew1,
      TimeEnvoye: Timenew1,
      textmessage: message,
      messagelue: "Non"
    });
    setMessage("");
  };

  const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  return (
    <div>
      <div className="contunemessageuser">
        {userData.map((user) => (
          <div key={user.ID} className="user" onClick={() => setUserId(user.ID)}>
            <div className="userpart">
              <div>
                <img src="#" className="imguser" alt="user" />
              </div>
              <div>
                <p className="nomuser">{`${user.Nom} ${user.Prenom}`}</p>
                <span className="lastmessage">#####</span>
              </div>
            </div>
            <div className="notification">
              <p className="nummessage">#</p>
            </div>
          </div>
        ))}
      </div>
      <div id="AfficheMessage">
        {/* Afficher les messages ici */}
      </div>
      <div id="ecriremessage" style={{ display: "none" }}>
        <input
          type="text"
          id="MessageEcrire"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button id="sendmessage" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
