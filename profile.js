

import { auth, db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

let currentUser = null;


onAuthStateChanged(auth, (user) => {
  if (user) currentUser = user;
});


  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();
  const category = document.getElementById("category").value.trim();
  const tagsInput = document.getElementById("tags").value.trim();
  const tags = tagsInput ? tagsInput.split(",").map(t => t.trim()) : [];
  const followers = Number(document.getElementById("Followers").value) || 0;

  const profileData = {
    uid: currentUser.uid,
    email: currentUser.email,
    name,
    role,
    category,
    tags,
    followers,
    createdAt: Date.now(),
  };

  try {
    await setDoc(doc(db, "users", currentUser.uid), profileData);
    alert("Profile Saved Successfully!");

    let redirectPage;
    switch (role?.toLowerCase()) {
      case "":
      case null:
      case undefined:
        redirectPage = "influencer_dashboard.html";
        break;
    }
    console.log("Redirecting to:", redirectPage);
    window.location.href = redirectPage;

  } catch (err) {
    alert("Error saving profile: " + err.message);
    console.error(err);
  }
}


document.getElementById("saveBtn").addEventListener("click", saveProfile);

