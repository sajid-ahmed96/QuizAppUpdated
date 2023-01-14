// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB57-AnVaJBGIg7YYo4ZBtfsdw5un-dnjU",
    authDomain: "quizapp-654e5.firebaseapp.com",
    databaseURL: "https://quizapp-654e5-default-rtdb.firebaseio.com",
    projectId: "quizapp-654e5",
    storageBucket: "quizapp-654e5.appspot.com",
    messagingSenderId: "231915338128",
    appId: "1:231915338128:web:a0fc6544594150632f5b15",
    measurementId: "G-0D1LXWB82R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

var question = document.getElementById('question')
var option = document.getElementById('option')
var optionParent = document.getElementById('optionParent')
var correctOption = document.getElementById('correctOption')
var correctAnswer;

var options = []

function showOption() {
    optionParent.innerHTML = ''
    for (var i = 0; i < options.length; i++) {
        optionParent.innerHTML += `<li onclick="setCorrectAnswer('${options[i]}')" class="p-2 bg-info rounded shadow my-2  ">${options[i]}</li>`
    }
}

window.setCorrectAnswer = function (a) {
    correctAnswer = a
    correctOption.innerHTML = correctAnswer
}

window.addOption = function () {
    options.push(option.value)
    console.log(options)
    showOption()
}

window.submitQuestion = function () {
    var questionsObj = {
        question: question.value,
        options: options,
        answer: correctAnswer
    }
    console.log(questionsObj)
    questionsObj.id = push(ref(database, "Questions/")).key
    const reference = ref(database, `Questions/${questionsObj.id}`)
    set(reference, questionsObj)
}