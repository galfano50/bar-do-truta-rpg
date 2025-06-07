// Configuração do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD_vM-tbAj_Gc2gv1XBa6GMOYpe9zNSv7s",
    authDomain: "bar-do-truta-rpg-online.firebaseapp.com",
    databaseURL: "https://bar-do-truta-rpg-online-default-rtdb.firebaseio.com",
    projectId: "bar-do-truta-rpg-online",
    storageBucket: "bar-do-truta-rpg-online.appspot.com",
    messagingSenderId: "109187771317",
    appId: "1:109187771317:web:13add20ef2fa8da2da07fc"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Exportando as instâncias para uso em outros arquivos
export { app, auth };