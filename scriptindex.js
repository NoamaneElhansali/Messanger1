// let contunemessageuser=document.getElementById("contunemessageuser");
let MessageEcrire = document.getElementById("MessageEcrire");
let sendmessage = document.getElementById("sendmessage");
let AfficheMessage = document.getElementById("AfficheMessage");
let ecriremessage = document.getElementById("ecriremessage");
let Btnmodification = document.getElementById("modification");
// Récupération des valeurs des cookies
// var email = localStorage.getItem("email");
//   var password = localStorage.getItem("password");

// Vérification de session basée sur les cookies
// if (email === "" || password === "") {
//   window.location.href = "login.html";
//   return;
// }



function verifielogin() {
  // Vérifie si l'email et le mot de passe sont présents dans le localStorage
  if (localStorage.getItem("email") === null || localStorage.getItem("password") === null) {
    window.location.href = "login.html";
  } else {
    // Vérifie si l'email contient "@" et "."
    if (!isValidEmail(localStorage.getItem("emailValid"))) {
      window.location.href = "login.html";
    }
    // Vérifie si le mot de passe est composé de 8 caractères
    if (localStorage.getItem("passwordValid").length < 8) {
      window.location.href = "login.html";
    }
  }
}

// Fonction pour valider l'email
function isValidEmail(email) {
  // Expression régulière pour valider l'email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

verifielogin();

//==============================
let exit_deconnexion = document.getElementById("exit-deconnexion");
exit_deconnexion.onclick = () => {
  window.location.href = "login.html";
}

let Déconnexion = document.getElementById('Déconnexion');
Déconnexion.onclick = () => {
  window.location.href = 'login.html';
}
//==============================

// Fonction pour récupérer la valeur d'un cookie par son nom
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

//==========================================
let iconmenu = document.getElementById("iconmenu");
let messenger_menu = document.getElementById("messenger-menu");
let echange = false;
iconmenu.onclick = () => {
  if (echange == false) {
    messenger_menu.style.display = "block";
    echange = true;
  } else {
    messenger_menu.style.display = "none";
    echange = false;
  }
};

let Liuserprofil = document.getElementById("Liuserprofil")
let back_profile = document.getElementById("back-profile")
let btnclose = document.getElementById("close");

Liuserprofil.onclick = () => {
  back_profile.style.display = "flex";

  messenger_menu.style.display = "none";
  echange = false;
}
btnclose.onclick = () => {
  back_profile.style.display = "none";
}
//================CON DAT==============================
// Import Firebase App initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUB7KIEaiIPR0o6Wwct98KRcD2ROnZywE",
  authDomain: "messnagernoamane.firebaseapp.com",
  projectId: "messnagernoamane",
  storageBucket: "messnagernoamane.appspot.com",
  messagingSenderId: "458352602831",
  appId: "1:458352602831:web:d0cb206cf149b8440dd1ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Import Firestore
import {
  getFirestore, doc, getDocs, getDoc, setDoc, collection, addDoc, deleteField, query, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Assign getFirestore to a variable
const db = getFirestore();

// Import Firebase Storage
import {
  getStorage, ref as sRef, uploadBytesResumable, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
//========================================
let input = document.createElement("input");
input.type = "file";
var files = [];
var reader = new FileReader();
let textenrg = document.getElementById("textenrg");
input.onchange = e => {
  files = e.target.files;
  reader.readAsDataURL(files[0]);
  textenrg.style.display = "block";
}
let srcimg = document.getElementById("img").src
reader.onload = function () {
  document.getElementById("img").src = reader.result;
}
let enrgistre = document.getElementById("enrg");
let Annule = document.getElementById("Annule");


Annule.onclick = () => {
  document.getElementById("img").src = srcimg;
  textenrg.style.display = "none";
}

Btnmodification.onclick = () => {
  input.click()
}

//==========UPLOUD IMGES=========================
function GetFileExt(file) {
  var temp = file.name.split('.');
  var ext = temp.splice((temp.length - 1), (temp.length));
  return '.' + ext[0];
}

function GetFileName(file) {
  var temp = file.name.split('.');
  var fname = temp.slice(0, -1).join('.');
  return fname;
}

async function UploadProcess() {

  var ImgToUpload = files[0];

  var ImgName = getCookie("UID") + GetFileExt(files[0]);

  const metaData = {

    contentType: ImgToUpload.type

  }

  const storage = getStorage();

  const stroageRef = sRef(storage, "images/" + ImgName);

  const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload, metaData);

  UploadTask.on('state-changed', (snapshot) => {

    var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    porsontageuploud.style.display = "block";
    porsontageuploud.innerHTML = parseInt(progess) + "%";
    if (porsontageuploud.innerText == "100%") {
      porsontageuploud.innerText = "le photo est enregistre.";
      setTimeout(() => {
        porsontageuploud.style.display = "none";
      }, 3000)

    }

  }, (error) => {
    porsontageuploud.innerHTML = "error: image not uploaded!";

  },
    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        saveURLtoFirestore(downloadURL);
      })
    }
  );
}


async function saveURLtoFirestore(url) {
  var name = getCookie("UTID");

  var ref = doc(db, "ImagesUser/" + name)

  await setDoc(ref, {
    ImageName: name,
    ImagesURL: url
  })
}

enrgistre.onclick = () => {
  UploadProcess();
  textenrg.style.display = "none";
};

//========================================
async function createImgElement(el) {
  const imageURL = await GetImagesfromFirestore(el.ID);
  let imguser = document.createElement("img");
  imguser.classList = "imguser";
  imguser.src = imageURL;

  if (imageURL == null) {
    imguser.style.display = "none";
  }

  return imguser;
}

function view(params) {
  const contunemessageuser = document.querySelector('.contunemessageuser');

  params.forEach(async el => {
    let divUser = document.createElement("div");
    divUser.classList = "user";
    divUser.dataset.ID = el.ID;
    divUser.dataset.active = "false";

    let userpart = document.createElement("div");
    userpart.classList = "userpart";

    let div1 = document.createElement("div");

    let imguser = await createImgElement(el);

    let div2 = document.createElement("div")

    let pnom = document.createElement("p")
    pnom.innerHTML = el.Nom + " " + el.Prenom;
    pnom.classList = "nomuser";

    let span = document.createElement("span");
    span.innerText = "";
    span.classList = "lastmessage";

    let divnotification = document.createElement("div");
    divnotification.classList = "notification";


    div1.appendChild(imguser);
    userpart.appendChild(div1);
    div2.appendChild(pnom);
    div2.appendChild(span);
    userpart.appendChild(div2)

    divUser.appendChild(userpart);
    divUser.appendChild(divnotification);
    divUser.onclick = async () => {
      const allUserDivs = document.querySelectorAll('.user');
      allUserDivs.forEach(user => {
        user.style.background = "black";
        user.dataset.active = "false";
      });
      let profile_dev_right = document.getElementById("profile-dev-right")
      profile_dev_right.style.display = "block";
      // Définit la couleur de fond du div actuel
      divUser.style.background = "rgba(255, 0, 0, 0.322)";
      divUser.dataset.active = "true";

      let imguser11 = document.getElementById("imguser");
      let Name_user = document.getElementById("Name-user");
      imguser11.src = await GetImagesfromFirestore(el.ID) ? await GetImagesfromFirestore(el.ID) : "img/images user.jpg";
      Name_user.innerText = `${el.Nom} ${el.Prenom}`;

      // Autres actions à effectuer lorsqu'un div est cliqué
      AfficheMessage.style.display = "block";
      ecriremessage.style.display = "flex";
      AfficheMessage.innerHTML = "";
      localStorage.setItem("UID", divUser.dataset.ID);
      
      GetDataMessageUser(divUser.dataset.ID);
      isVideoSupportedsize();
      window.matchMedia('(max-width: 700px)').addEventListener('change', isVideoSupportedsize);
    };

    sendmessage.onclick = () => {
      if (MessageEcrire.value !== "") {
        EnvoyeMessage(localStorage.getItem("UID"));
        MessageEcrire.value = "";
      }
    };

    contunemessageuser.appendChild(divUser);
  });
}
//====================
let angle_left = document.getElementById("angle-left")
function isVideoSupportedsize() {
  let divleft = document.getElementById("divleft");
  let divright = document.getElementById("divright");

  if (window.matchMedia('(max-width: 700px)').matches) {
    // Si la largeur de l'écran est inférieure à 700px
    divleft.style.display = "none";
    divright.style.display = "block";
    angle_left.onclick = () => {
      divright.style.display = "none";
      divleft.style.display = "block";
    }
  } else {
    // Si la largeur de l'écran est supérieure à 700px
    divleft.style.display = "block";
    divright.style.display = "block";
  }
}






//===================


//=================

//========================================================
async function GetImagesfromFirestore(identif) {
  try {
    const name = identif;
    const ref = doc(db, "ImagesUser", name); // Construct reference to document
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return docSnap.data().ImagesURL;
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
}

async function GetAllDocument() {

  try {
    const dataDoc = [];
    const docSnapshots = await getDocs(collection(db, "User"));
    docSnapshots.forEach(async (doc) => {
      if (doc.data().ID != getCookie("UTID")) {
        dataDoc.push(doc.data());
      } else {
        const Name = document.getElementById("fullname");
        const Emailuser = document.getElementById("email");
        const img = document.getElementById("img");

        Name.innerText = `${doc.data().Prenom} ${doc.data().Nom}`;
        Emailuser.innerText = doc.data().Email;
        const imageURL = await GetImagesfromFirestore(getCookie("UTID"));
        if (imageURL) {
          img.src = imageURL;
        } else {
          console.log("Image URL not found");
        }
      }
    });
    view(dataDoc);
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
}

window.onload = () => {
  GetAllDocument();

};

//======================FUNCTION DE ID MESSAGE=========================
function generateRandomId(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

//============FUNCTION DE DATA MESSAGE==========================
// let datenew1=;
//   let Timenew1=;
async function EnvoyeMessage(el) {
  let id = generateRandomId(8);
  var ref = doc(db, "Message", id);
  // const docSnap = await getDoc(ref);
  await setDoc(
    ref, {
    IdMessage: id,
    UserEnvoye: getCookie("UTID"),
    UserEmetteur: el,
    DateEnvoye: datenew(),
    TimeEnvoye: Timenew(),
    textmessage: MessageEcrire.value,
    messagelue: "Non"
  }
  );
  GetDataMessageUser(localStorage.getItem("UID"))

}
//=========================================
//=================FUNCTION DATE============================
function datenew() {
  var currentDate = new Date();

  // Extraction de l'année, du mois et du jour
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de zéro
  var day = String(currentDate.getDate()).padStart(2, '0');

  // Création de la chaîne de date au format "YYYY-MM-DD"
  return `${year}-${month}-${day}`;
}

function Timenew() {
  var currentDate = new Date();

  var hours = String(currentDate.getHours()).padStart(2, '0');
  var minutes = String(currentDate.getMinutes()).padStart(2, '0');
  var seconds = String(currentDate.getSeconds()).padStart(2, '0');
  var milliseconds = parseInt(String(currentDate.getMilliseconds()).slice(0, 2).padStart(2, '0'))

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
//=========ERIRE LES MESSAGE EN AFFICHAGE===============
function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight - element.clientHeight;
}


function EcrireDate(entre, datesEcrits, num) {
  let today = formatDate(new Date()); // Formater la date d'aujourd'hui
  let date = formatDate(entre);

  if (Array.isArray(datesEcrits)) {
    if (!datesEcrits.includes(date) && num <= 1) {
      let div = document.createElement("div");
      div.classList = "dateecrire";
      let p = document.createElement("p");
      p.classList = "paragraphdate";
      if (date === today) {
        p.innerText = "Aujourd'hui";
      } else {
        p.innerText = date;
      }
      div.appendChild(p);
      AfficheMessage.appendChild(div);
      datesEcrits.push(date);
      num++;
    }
  } else {
    console.log("Error: datesEcrits is not an array");
  }
}




function formatDate(inputDate) {
  // Créer un nouvel objet Date à partir de la chaîne de caractères de date
  let dateObject = new Date(inputDate);

  // Tableaux pour mapper les noms des mois et des jours de la semaine
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Extraire les composants de la date
  let year = dateObject.getFullYear();
  let monthIndex = dateObject.getMonth();
  let dayOfMonth = dateObject.getDate();
  let dayOfWeekIndex = dateObject.getDay();

  // Formater la date au format souhaité
  let formattedDate = daysOfWeek[dayOfWeekIndex] + " " + months[monthIndex] + " " + dayOfMonth + " " + year;

  return formattedDate;
}


function viewMessageEnvoye(message, datenew1, Timenew1) {
  let divContMessageEnvoye = document.createElement("div");
  divContMessageEnvoye.classList = "contmessageenvoye";
  let Timenew=Timenew1.split(":")[0]+":"+Timenew1.split(":")[1]
  let divmessage = document.createElement("div");
  divmessage.classList = "message-container message message-time";
  divmessage.innerText = message;
  divContMessageEnvoye.appendChild(divmessage);

  let divContMessageEnvoye1 = document.createElement("div");
  divContMessageEnvoye1.classList = "contmessageenvoye1";
  divContMessageEnvoye1.innerText = `${Timenew}`;

  AfficheMessage.appendChild(divContMessageEnvoye);
  divmessage.appendChild(divContMessageEnvoye1);

  // Faire défiler la zone de messages jusqu'en bas
  scrollToBottom(AfficheMessage);
}



function viewMessageEmetteur(message, datenew1, Timenew1) {
  let divContMessageEnvoye = document.createElement("div");
  divContMessageEnvoye.classList = "contmessageEmetteur";
  let Timenew=Timenew1.split(":")[0]+":"+Timenew1.split(":")[1]
  let divmessage = document.createElement("div")
  divmessage.classList = "message-container message message-time";
  divmessage.innerText = message;

  divContMessageEnvoye.appendChild(divmessage);

  let divContMessageEnvoye1 = document.createElement("div")
  divContMessageEnvoye1.classList = "contmessageEmetteur1";
  divContMessageEnvoye1.innerText = `${Timenew}`;

  AfficheMessage.appendChild(divContMessageEnvoye);
  divmessage.appendChild(divContMessageEnvoye1);

  scrollToBottom(AfficheMessage);
}
//===============AFFICHE LES MESSAGE==============================
async function GetDataMessageUser(el) {
  // const query = query(collection(db, "Message"));

  // Mettre en place un écouteur en temps réel
  const unsubscribe = onSnapshot(query(collection(db, "Message")), (snapshot) => {
    // Réinitialiser la liste de messages
    const messages = [];
    AfficheMessage.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (
        (data.UserEmetteur === el && data.UserEnvoye === getCookie("UTID")) ||
        (data.UserEmetteur === getCookie("UTID") && data.UserEnvoye === el)
      ) {
        messages.push({
          id: doc.id,
          ...data
        });
      }
    });

    localStorage.setItem("lenghtdata", messages.length);

    // Trier les messages par date et heure
    messages.sort((a, b) => {
      const dateComparison = a.DateEnvoye.localeCompare(b.DateEnvoye);
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return a.TimeEnvoye.localeCompare(b.TimeEnvoye);
    });

    let datesEcrits = [];
    let num = 0;
    messages.forEach((message) => {
      if (
        (message.UserEmetteur === el && message.UserEnvoye === getCookie("UTID")) ||
        (message.UserEmetteur === getCookie("UTID") && message.UserEnvoye === el)
      ) {
        EcrireDate(message.DateEnvoye, datesEcrits, num);
        if (message.UserEmetteur === el && message.UserEnvoye === getCookie("UTID")) {
          viewMessageEnvoye(message.textmessage, message.DateEnvoye, message.TimeEnvoye);
          window.scrollTo(0, document.body.scrollHeight);
        } else {
          viewMessageEmetteur(message.textmessage, message.DateEnvoye, message.TimeEnvoye);
        }
      }
    });
  });
}

//===========================================




