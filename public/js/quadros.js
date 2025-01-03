const db = firebase.firestore();

// Captura o id da URL (não boardId)
const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get('id'); // Aqui você deve usar 'id' para capturar o parâmetro correto

console.log(boardId); // Verifique se boardId está correto

if (boardId) {  // Verifica se boardId existe
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            await loadBoard(boardId);
        }
    });
} else {
    console.error('boardId não encontrado na URL!');
    alert('boardId não encontrado na URL!');
}

if (boardId) {  // Verifica se boardId existe
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            await loadBoard(boardId);
        }
    });
} else {
    console.error('boardId não encontrado na URL!');
    alert('boardId não encontrado na URL!');
}

async function loadBoard(boardId) {
    const boardSnapshot = await db.collection('boards').doc(boardId).get();
    
    if (boardSnapshot.exists) {
        const boardData = boardSnapshot.data();
        document.getElementById('boardName').textContent = boardData.nome;
        boardData.listas.forEach((listName) => {
            createList({ nome: listName, tarefas: [] });
        });
    } else {
        console.error('Quadro não encontrado!');
        alert('Quadro não encontrado!');
    }
}

// Cria uma nova lista
document.getElementById('saveListBtn').addEventListener('click', async () => {
    const listName = document.getElementById('listName').value;
    if (listName && boardId) {  // Garante que boardId existe
        const newListRef = await db.collection('lists').add({
            nome: listName,
            tarefas: [],
            boardId: boardId, // Referência ao quadro
        });
        
        await db.collection('boards').doc(boardId).set({
            listas: firebase.firestore.FieldValue.arrayUnion(listName)
        }, { merge: true });
        

        $('#addListModal').modal('hide');
        createList(newListRef.id); // Cria a lista na interface
    }
});

// Cria a estrutura da lista no HTML
async function createList(listId) {
    const listSnapshot = await db.collection('lists').doc(listId).get();
    const listData = listSnapshot.data();

    const listContainer = document.getElementById('listsContainer');
    const listDiv = document.createElement('div');
    listDiv.classList.add('col-md-4', 'mb-4');
    listDiv.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${listData.nome}</h5>
                <ul id="taskList-${listId}" class="list-group">
                    <!-- Tarefas serão exibidas aqui -->
                </ul>
                <button class="btn btn-secondary btn-sm mt-2" onclick="addTask('${listId}')">Adicionar Tarefa</button>
            </div>
        </div>
    `;
    listContainer.appendChild(listDiv);

    loadTasks(listId); // Carregar as tarefas da lista
}

// Carregar as tarefas de uma lista
async function loadTasks(listId) {
    const taskSnapshot = await db.collection('tasks').where('list_id', '==', listId).get();
    taskSnapshot.forEach((taskDoc) => {
        const taskData = taskDoc.data();
        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item');
        taskItem.textContent = taskData.nome;
        document.getElementById(`taskList-${listId}`).appendChild(taskItem);
    });
}

// Função para adicionar uma tarefa
async function addTask(listId) {
    const taskName = prompt('Nome da tarefa:');
    if (taskName) {
        await db.collection('tasks').add({
            nome: taskName,
            list_id: listId,
            status: 'Em andamento',
            data_criacao: new Date(),
        });

        loadTasks(listId); // Recarregar as tarefas da lista
    }
}
