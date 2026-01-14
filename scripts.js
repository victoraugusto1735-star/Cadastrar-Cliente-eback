const API_URL = "https://crudcrud.com/api/721b0310f26f43a8ba41aca7bd53c268/Cadastro";

// Carregar lista ao abrir a página
document.addEventListener("DOMContentLoaded", listarClientes);

// Cadastrar cliente (POST)
function cadastrarCliente() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        listarClientes();
    })
    .catch(err => console.error("Erro ao cadastrar:", err));
}

// Listar clientes (GET)
function listarClientes() {
    fetch(API_URL)
        .then(res => res.json())
        .then(clientes => {
            const lista = document.getElementById("listaClientes");
            lista.innerHTML = "";
            clientes.forEach(cliente => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${cliente.nome} - ${cliente.email} 
                    <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
                `;
                lista.appendChild(li);
            });
        })
        .catch(err => console.error("Erro ao listar:", err));
}

// Excluir cliente (DELETE)
function excluirCliente(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => listarClientes())
        .catch(err => console.error("Erro ao excluir:", err));
}
