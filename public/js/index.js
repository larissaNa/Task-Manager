
  // Lógica principal para verificar o usuário logado
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
      console.log("Usuário não autenticado. Redirecionando para a página de login...");
      window.location.href = "./html/login.html"; // Redireciona para a página de login
    }
  });
  