import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    getDocs
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';
// ne pas effacer ou changer : configurations Firebase
let firebaseConfig = {
    apiKey: "AIzaSyAgA7Z2WyTM1BgVEQd3XveiSaONKZrUN8k",
    authDomain: "sidescroller-89622.firebaseapp.com",
    projectId: "sidescroller-89622",
    storageBucket: "sidescroller-89622.appspot.com",
    messagingSenderId: "650779201021",
    appId: "1:650779201021:web:c3e7d43d4c357030b05d94",
    measurementId: "G-FMDRRS3J3R"
};

// Initialize Firebase
let firebase = initializeApp(firebaseConfig);



function getScores() {
    let db = getFirestore();
    let scoresRef = collection(db, 'scores');
    let q = query(scoresRef, orderBy('score', 'desc'));

    getDocs(q).then(snapshot => {
        let scores = snapshot.docs.map(doc => ({
            username: doc.data().username,
            score: doc.data().score
        }))
        console.log(scores);
        return scores;
    }).then((scores) => {
        updateScoreboard(scores);
    });

}

function sortScores(scores) {
    scores.sort((a, b) => {
        return b.score - a.score;
    });
}

function updateScoreboard(scores) {
    sortScores(scores);
    let scoreboard = document.getElementById('score-list');
    if (scores) {
        scores.forEach(score => {
            let li = document.createElement('li');
            let p = document.createElement('p');
            let p2 = document.createElement('p');
            p.innerHTML = score.username;
            p2.innerHTML = score.score;
            li.appendChild(p);
            li.appendChild(p2);
            scoreboard.appendChild(li);
        });
    }
}


getScores();