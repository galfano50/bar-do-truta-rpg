import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Inicializar autenticação
const auth = getAuth();

// Exibir mensagens
function exibirMensagem(msg, tipo = "info") {
    let el = document.getElementById("mensagem");
    if (el) {
        el.innerText = msg;
        el.style.color = tipo === "erro" ? "red" : "lime";
        el.style.fontWeight = "bold";
    } else {
        console.log(msg);
    }
}

// Registrar novo usuário
function register(email, password) {
    if (!email || !password) {
        exibirMensagem("Preencha todos os campos.", "erro");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            exibirMensagem("Usuário registrado com sucesso.");
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                exibirMensagem("Erro: O email já está em uso.", "erro");
            } else {
                exibirMensagem("Erro ao registrar: " + error.message, "erro");
            }
        });
}

// Fazer login
function login(email, password) {
    if (!email || !password) {
        exibirMensagem("Preencha todos os campos.", "erro");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            exibirMensagem("Login realizado! Redirecionando...");
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);
        })
        .catch((error) => {
            exibirMensagem("Erro ao logar: " + error.message, "erro");
        });
}

// Fazer logout
function logout() {
    signOut(auth)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            exibirMensagem("Erro ao deslogar: " + error.message, "erro");
        });
}

// Redirecionar automaticamente se estiver logado
onAuthStateChanged(auth, (user) => {
    const atual = window.location.pathname;
    if (user && (atual.includes("index.html") || atual === "/" || atual === "/index.html")) {
        window.location.href = "home.html";
    }
});

// Exportar
export { register, login, logout };
