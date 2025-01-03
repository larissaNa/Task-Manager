// auth.onAuthStateChanged(userChanged);

firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.emailVerified) {
      window.location.href = '../index.html'; // Redireciona se o e-mail estiver verificado
    } else if (user && !user.emailVerified) {
      alert('Por favor, verifique seu e-mail antes de acessar.');
    }
  });
  
  
  function loginWithEmailAndPassword() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                window.location.href = '../index.html'; // Redireciona se o e-mail estiver verificado
                console.log('usuário autenticado');
            } else {
                alert('Por favor, verifique seu e-mail antes de fazer login.');
            }
        })
        .catch((error) => {
            alert('Erro no login: ' + error.message);
        });
}


const provider = new firebase.auth.GoogleAuthProvider();
function loginWithGoogle(){
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        // Autenticação bem-sucedida, você pode acessar os detalhes do usuário em result.user
        const user = result.user;
        console.log(user);
    })
    .catch((error) => {
        console.error(error);
    });

}

// function userChanged(user){
//     if (user) {
//         console.log("Usuário autenticado:", user);
//         window.location.href = '../index.html';
//     } else {
//         console.log("Usuário não autenticado. Redirecionando para a página de login...");
//     }
// }

//menu mobile
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'right' });
  });




