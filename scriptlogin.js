let Log_in=document.getElementById("Log-in");
let Sign_up=document.getElementById("Sign-up");
let creeCompte=document.getElementById("cree");
let form1=document.getElementById("form1");
let form2=document.getElementById("form2");
let loginform2=document.getElementById("log");
let emailform1=document.getElementById("email");
let passwordform1=document.getElementById("password");
let Nomform2=document.getElementById("Nom2");
let Prenomform2=document.getElementById("Prenom2");
let Emailform2=document.getElementById("Email2");
let passwordform2=document.getElementById("password2");
let confermepasswordform2=document.getElementById("confermepassword");
let AccontCreateSuccessfuly=document.getElementById("accontcree");
let cross = document.getElementById("cross");
let btn_close=document.getElementById("btn-close");

Sign_up.onclick=()=>{
    form1.style.display="none";
    form2.style.display="block";
}
loginform2.onclick=()=>{
    form1.style.display="block";
    form2.style.display="none";
}

//=======valide function login===========
function validateLoginForm() {
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    // Validation de l'email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("errur1").innerHTML="Veuillez saisir une adresse email valide.";
        document.getElementById("errur").innerHTML="";
        document.getElementById("errur1").style.color="red";
        return false;
    }

    // Validation du mot de passe
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2}).{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("errur").innerHTML="Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et deux chiffres.";
        document.getElementById("errur1").innerHTML="";
        document.getElementById("errur").style.color="red";
        return false;
    }

    // Si toutes les validations sont passées, retourner true
    return true;
}

//=================================
function validateSignUpForm() {
    var nom = document.getElementById("Nom2").value;
    var prenom = document.getElementById("Prenom2").value;
    var email = document.getElementById("Email2").value;
    var password = document.getElementById("password2").value;
    var confirmPassword = document.getElementById("confermepassword").value;
    // Validation des champs vides
    if (nom.trim() === '' || prenom.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        document.getElementById("erurr2").innerHTML="Veuillez remplir tous les champs.";
        document.getElementById("erurr2").style.color="red";
        return false;
    }

    // Validation de l'email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("erurr2").innerHTML="";
        document.getElementById("erurr3").innerHTML="Veuillez saisir une adresse email valide.";
        document.getElementById("erurr3").style.color="red";
        return false;
    }

    // Validation du mot de passe
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d).{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("erurr2").innerHTML="";
        document.getElementById("erurr3").innerHTML="";
        document.getElementById("erurr4").innerHTML="Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et deux chiffres.";
        document.getElementById("erurr4").style.color="red";
        return false;
    }

    // Validation de la correspondance des mots de passe
    if (password !== confirmPassword) {
        document.getElementById("erurr2").innerHTML="";
        document.getElementById("erurr3").innerHTML="";
        document.getElementById("erurr4").innerHTML="";
        document.getElementById("erurr5").innerHTML="Les mots de passe ne correspondent pas.";
        document.getElementById("erurr5").style.color="red";
        return false;
    }

    // Si toutes les validations sont passées, retourner true
    return true;
}

// Log_in.onclick=()=>{
//     validateLoginForm();
// }



  // Import the functions you need from the SDKs you need
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
  import {
    getFirestore,doc,getDoc,setDoc,collection,addDoc,updateDoc,deleteDoc,deleteField
}from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
  const db= getFirestore();
//======================FUNCTION DE ID UTILISATURE=========================
        function generateRandomId(length) {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&@`)(-_';
            var result = '';

            for (var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }

            return result;
        }

//=================Function alert bootstarap=================================
function showAlert(message, alertType) {
    // Créer un élément div pour l'alerte Bootstrap
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-dismissible', 'fade', 'show');

    // Ajouter la classe d'alerte spécifiée (success, danger, etc.)
    alertDiv.classList.add('alert-' + alertType);

    // Ajouter le message à l'alerte
    alertDiv.innerHTML = message;

    // Créer le bouton de fermeture
    var closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('btn-close');
    closeButton.innerText="X";
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.onclick=()=>{
        document.body.removeChild(alertDiv);
    }
    // Ajouter le bouton de fermeture à l'alerte
    alertDiv.appendChild(closeButton);

    // Ajouter l'alerte à la page
    document.body.appendChild(alertDiv);

    // Faire défiler jusqu'à l'alerte
    alertDiv.scrollIntoView();
}



  //======INSERT FUNCTION===========================
  async function AddDocoment_CustomID() {
    let id=generateRandomId(8);
    var ref = doc(db, "User", Emailform2.value);
    try {
        var ref =doc(db,"User", Emailform2.value);
        const docSnap = await getDoc(ref);
        if(!docSnap.exists()){
        await setDoc(
            ref, {
                ID:id,
                Nom: Nomform2.value,
                Prenom: Prenomform2.value,
                Email: Emailform2.value,
                Password: passwordform2.value,
            }
        );

        AccontCreateSuccessfuly.style.display="flex";
        form2.style.display="none";
        form1.style.display="none";
        Nomform2.value="";
        Prenomform2.value="";
        Emailform2.value="";
        passwordform2.value="";
        confermepasswordform2.value="";
    }else{
        showAlert('Email est déjà existe', 'danger');
    }
    } catch (err) {
        throw err;
    }
    
}
cross.onclick=()=>{
    AccontCreateSuccessfuly.style.display="none";
    form2.style.display="none";
    form1.style.display="block";
}
creeCompte.onclick = async () => {
    if (validateSignUpForm()) {
        const loader = document.querySelector('.loader-wrapper');
        loader.style.display = 'flex'; // Afficher le loader avant d'appeler AddDocoment_CustomID

        try {
            await AddDocoment_CustomID();
            loader.style.display = 'none'; // Masquer le loader une fois AddDocoment_CustomID terminée
            document.body.style.overflow = 'visible';
        } catch (err) {
            loader.style.display = 'none'; // Masquer le loader en cas d'erreur
            alert("Une erreur s'est produite lors de l'ajout du document: " + err);
        }
    }
}
window.addEventListener('load', function () {
    function on(){
        const loader = document.querySelector('.loader-wrapper');
    loader.style.display = 'none';
    document.body.style.overflow = 'visible';
    } 
    setTimeout(on,1000);
});
//================================================
//==========GETTING DOCUMENT====================================
async function GetADocument(){
    var ref =doc(db,"User", emailform1.value);
    const docSnap = await getDoc(ref);
    if(docSnap.exists()){
        if(docSnap.data().Password==passwordform1.value){
            document.cookie = `UTID=${docSnap.data().ID};max-age= ${(60 * 60)*20000}`;
            document.cookie = `emailValid=${emailform1.value};max-age= ${(60 * 60)*20000}`;
            document.cookie = `passwordValid=${passwordform1.value};max-age= ${(60 * 60)*20000}`;
            localStorage.setItem("emailValid",emailform1.value)
            // localStorage.setItem("UTID",docSnap.data().ID)
            localStorage.setItem("passwordValid",passwordform1.value)
            // Redirection vers une autre page
            window.location.href = "index.html";

        }else{
            document.cookie = `UTID=${""};max-age= ${(60 * 60)*20000}`;
            document.cookie = `emailValid=${""};max-age= ${(60 * 60)*20000}`;
            document.cookie = `passwordValid=${""};max-age= ${(60 * 60)*20000}`;
            localStorage.setItem("emailValid","")
            // localStorage.setItem("UTID",docSnap.data().ID)
            localStorage.setItem("passwordValid","")
            document.getElementById("errur").innerHTML="*le mot de passe n'est pas vrai";
            document.getElementById("errur").style.color="red";
        }
    }else{
        document.getElementById("errur1").innerHTML="Email ou password n'est pas vrai";
        document.getElementById("errur1").style.color="red";
    }
}
// //====================================
localStorage.setItem('email', "");
localStorage.setItem('password',"");


Log_in.onclick=()=>{
    if(validateLoginForm()){
        GetADocument();
        localStorage.setItem('email', emailform1);
        localStorage.setItem('password',passwordform1);
    }else{
        localStorage.setItem('email', "");
        localStorage.setItem('password',"");
    }

}