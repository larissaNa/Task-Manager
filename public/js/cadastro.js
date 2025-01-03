function registerWithEmailAndPassword() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        alert("Usuário cadastrado com sucesso! Um e-mail de verificação foi enviado para " + email);
        return userCredential.user.sendEmailVerification(); // Envia o e-mail de verificação
      })
      .catch(function(error) {
        var errorMessage = error.message;
        alert("Erro ao cadastrar usuário: " + errorMessage);
      });
  }
  
  // Verifica se o usuário está autenticado e se o e-mail foi verificado ao carregar a página
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.emailVerified) {
      // Redireciona para a tela principal se o usuário estiver autenticado e o e-mail estiver verificado
      window.location.href = '../index.html';
    }
  });
  
  //menu mobile
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'right' });
  });
  
  