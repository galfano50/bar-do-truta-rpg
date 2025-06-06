// Importar Firebase Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Inicializar autenticação
const auth = getAuth();

// Registrar novo usuário
function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Usuário registrado:", userCredential.user);
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                console.error("Erro: O email já está em uso.");
            } else {
                console.error("Erro ao registrar:", error.message);
            }
        });
}

// Fazer login
function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Usuário logado:", userCredential.user);
        })
        .catch((error) => {
            console.error("Erro ao logar:", error.message);
        });
}

// Fazer logout
function logout() {
    signOut(auth)
        .then(() => {
            console.log("Usuário deslogado");
            window.location.href = "index.html"; // Redireciona para login após logout
        })
        .catch((error) => {
            console.error("Erro ao deslogar:", error.message);
        });
}

// Expor funções globalmente
window.register = register;
window.login = login;
window.logout = logout;

// Verificar se o usuário está logado ao carregar o site
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuário logado:", user);
        if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
            window.location.href = "home.html"; // Redireciona para a home se já estiver logado
        }
    } else {
        console.log("Nenhum usuário logado.");
        if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
            window.location.href = "index.html"; // Redireciona para login se não estiver logado
        }
    }
});