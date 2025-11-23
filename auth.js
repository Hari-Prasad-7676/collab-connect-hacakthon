import { auth, db } from "../src/firebase.js";

/*.........signup page.....*/

import {
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { auth, db } from "../src/firebase.js";

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        email: email,
        role: role
      });

      window.location.href = `${role}_dashboard.html`;

    } catch (err) {
      alert(err.message);
    }
  });
}


/*........Login page......*/

const loginForm  = document.getElementById("LoginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const docRef = await getDoc(doc(db, "users", res.user.uid));

      const userData = docRef.data();
      if (!userData) {
        alert("User document not found.");
        return;
      }
      const role = userData.role;

      const profileDoc = await getDoc(doc(db, "profiles", res.user.uid));

      if (!profileDoc.exists()) {
        window.location.href = "profile.html";
      } else {
        window.location.href = `${role}_dashboard.html`;
      }

    } catch (err) {
      alert(err.message);
    }
  });
}


