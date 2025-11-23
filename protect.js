import {auth, db} from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import{
  doc, getdoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const expectedRole = document.body.getAttribute("data-role");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const docRef = await getdoc(doc(db, "users", user.uid));
  const role = docRef.data().role;

  if (role !== expectedRole)
    window.location.href = "login html";

});
