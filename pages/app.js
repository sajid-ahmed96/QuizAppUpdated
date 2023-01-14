// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
// const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

var questions = [{
    question: "HTML stands for",
    answer: "Hyper Text Markup Language",
    options: [
        "Hyper Text Meaning Language",
        "Hyper Tool Markup Language",
        "Hyper Text Markup Language",
        "Hyper Text Multiple Language",
    ]
},
{
    question: "CSS stands for",
    answer: "Cascading Style Sheet",
    options: [
        "Creative Style Sheet",
        "Cascading Style Sheet",
        "Common Style Sheet",
        "Colorful Style Sheet",
    ]
},
{
    question: "PHP stands for",
    answer: "Hypertext Preprocessor",
    options: [
        "Hypertext Preprocessor",
        "Hypertext Programming",
        "Hypertext Prerogramming",
        "Hometext Prerogramming",
    ]
},
{
    question: "SQL stands for",
    answer: "Structured Query Language",
    options: [
        "Structured Quantum Language",
        "Strict Query Language",
        "Stylesheet Query Language",
        "Structured Query Language",
    ]
},
{
    question: "XML stands for",
    answer: "eXtensible Markup Language",
    options: [
        "eXtensible Markup Language",
        "eXecutable Markup Language",
        "eXtra Multi-programming Language",
        "eXamine Multiple Language",
    ]
},
{
    question: "Whict tag is this <>:",
    answer: "An opening tag",
    options: [
        "A para tag",
        "An opening tag",
        "Both A & B",
        "A self closing tag",
    ]
},
{
    question: "span is a ______ element",
    answer: "Inline",
    options: [
        "Block",
        "Inline-Block",
        "Flex",
        "Inline",
    ]
},
{
    question: "Which hex color code define the white color?",
    answer: "#ffffff",
    options: [
        "#000000",
        "#ffffff",
        "#eeeeee",
        "#111111",
    ]
},
{
    question: "How to style a class attribute?",
    answer: ".className",
    options: [
        ".className",
        "#className",
        "className",
        "p className",
    ]
},
{
    question: "How to style a id attribute?",
    answer: "#idName",
    options: [
        "idName",
        ".idName",
        "h1 idName",
        "#idName",
    ]
}
]

var userAuthId = localStorage.getItem("userAuthId")
var userDeatils;
var userId = document.getElementById('userId')
var questionNum = document.getElementById('questionNum');
var question = document.getElementById('question');
var indexNum = 0;
var ansParent = document.getElementById('ansParent');
var marks = 0;
var logoutUser = document.getElementById('logoutUser')

function getQuestionsFromDatabase() {
    const reference = ref(database, "Questions/")
    onChildAdded(reference, function (data) {
        console.log(data.val())
        questions.push(data.val())
        showQuestion()
    })
}
getQuestionsFromDatabase()

function renderUser() {
    const reference = ref(database, `users/${userAuthId}`)
    onValue(reference, function (dt) {
        userDeatils = dt.val()
        userId.innerHTML = userDeatils.name
    })
}
renderUser()

function showQuestion() {
    question.innerHTML = questions[indexNum].question;
    questionNum.innerHTML = "Question # " + [indexNum + 1] + "/" + questions.length;
    ansParent.innerHTML = "";
    for (var i = 0; i < questions[indexNum].options.length; i++) {
        ansParent.innerHTML += `<div class="col-md-6 py-2">
        <button class="btn btn-outline-primary px-5 rounded-pill w-100"
        onclick="checkAns('${questions[indexNum].options[i]}','${questions[indexNum].answer}')">
        ${questions[indexNum].options[i]}</button>
    </div>`
    }
}
showQuestion()

function nextQuestion() {
    indexNum++;
    showQuestion()
}

window.checkAns = function (a, b) {
    if (a == b) {
        marks++;
        console.log(marks);
    }
    if (indexNum + 1 == questions.length) {
        alert("Your marks: " + marks);
    }
    else {
        nextQuestion();
    }
}

window.logOut = function () {
    if (logoutUser.value == "logout") {
        window.location.replace('login.html')
    }
}