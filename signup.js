// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

var fullName = document.getElementById('fullName')
var email = document.getElementById('email')
var password = document.getElementById('password')

window.signUp = function (e) {
    if (!fullName.value) {
        alert("Please Enter Fullname")
        return
    }
    if (!email.value) {
        alert("Please Enter email")
        return
    }
    if (!password.value) {
        alert("Please Enter password")
        return
    }

    var signUpObj = {
        name: fullName.value,
        email: email.value,
        password: password.value
    }

    createUserWithEmailAndPassword(auth, signUpObj.email, signUpObj.password)
        .then(function (rec) {
            console.log(rec.user.uid)
            signUpObj.id = rec.user.uid
            const reference = ref(database, `users/${signUpObj.id}`)
            set(reference, signUpObj)
                .then(function () {
                    localStorage.setItem("userAuthId", signUpObj.id)
                    window.location.assign('pages/login.html')
                })
                .catch(function (err) {
                    alert(err.message)
                })
        })
        .catch(function (err) {
            alert(err.message)
        })
}

window.reload = function (e) {
    e.preventDefault();
}

window.goTo = function () {
    window.location.assign("pages/login.html")
}