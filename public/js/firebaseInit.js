const firebaseConfig = {
    apiKey: "AIzaSyDreqCCyT66UCUCyk5ynjnB1i01qQASn8k",
    authDomain: "task-manager-e1659.firebaseapp.com",
    projectId: "task-manager-e1659",
    storageBucket: "task-manager-e1659.firebasestorage.app",
    messagingSenderId: "469176308479",
    appId: "1:469176308479:web:65249421e19b0b8ec672ca",
    measurementId: "G-BBT9EQQQEW"
    };
    
  // Inicializa o Firebase
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  