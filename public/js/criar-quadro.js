const db = firebase.firestore();

// Captura o boardId da URL (por exemplo: /quadros.html?id=12345)
const urlParams = new URLSearchParams(window.location.search);
let boardId = urlParams.get('id');

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        await loadBoard(boardId);
    }
});

// Obter o formulário e adicionar um ouvinte de evento
const createBoardForm = document.getElementById('createBoardForm');
createBoardForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Obter os valores do formulário
    const boardName = document.getElementById('boardName').value.trim();
    const boardDescription = document.getElementById('boardDescription').value.trim();

    // Obter o ID do usuário autenticado
    const user = firebase.auth().currentUser;
    if (!user) {
        showMessage('Usuário não autenticado. Faça login novamente.', 'danger');
        return;
    }
    const userId = user.uid;

    // Validar os campos do formulário
    if (!boardName) {
        showMessage('Por favor, insira o nome do quadro.', 'danger');
        return;
    }

    // Criar o quadro no Firestore com listas e tarefas como arrays vazios
    try {
        // Criar o quadro no Firestore
        const boardRef = await db.collection('boards').add({
            nome: boardName,
            descricao: boardDescription,
            user_id: userId,
            data_criacao: firebase.firestore.FieldValue.serverTimestamp(),
            listas: [], // Array vazio de listas
            tarefas:[]
        })

        // Exibir mensagem de sucesso
        showMessage('Quadro criado com sucesso!', 'success');

        // Limpar o formulário
        createBoardForm.reset();
    } catch (error) {
        console.error('Erro ao criar o quadro:', error);
        showMessage('Erro ao criar o quadro. Por favor, tente novamente.', 'danger');
    }
});

// Função para exibir mensagens
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = ''; // Limpar a mensagem após 3 segundos
    }, 3000);
}
