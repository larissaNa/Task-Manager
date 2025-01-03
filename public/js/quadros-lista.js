const db = firebase.firestore();

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        await loadBoards(user.uid);
    }
});

// Carregar todos os quadros do usuário
async function loadBoards(userId) {
    const boardContainer = document.getElementById('boardsContainer');
    const boardSnapshot = await db.collection('boards').where('user_id', '==', userId).get();

    if (boardSnapshot.empty) {
        const noBoardsMessage = document.createElement('p');
        noBoardsMessage.textContent = 'Você ainda não tem quadros. Crie um novo quadro!';
        boardContainer.appendChild(noBoardsMessage);
    } else {
        boardSnapshot.forEach((doc) => {
            const boardData = doc.data();
            const boardButton = document.createElement('button');
            boardButton.classList.add('btn', 'btn-primary', 'btn-lg', 'col-md-4', 'mb-3');
            boardButton.textContent = boardData.nome;
            boardButton.onclick = () => redirectToBoard(doc.id);

            boardContainer.appendChild(boardButton);
        });
    }
}

// Redireciona o usuário para o quadro específico
function redirectToBoard(boardId) {
    window.location.href = `quadro.html?id=${boardId}`;
}
