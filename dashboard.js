/*......Logout logic.....*/
import {auth} from "../src/firebase.js"
import{
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("logoutbutton").onclick = async () => {
  await signOut(auth);
  window.location.href = "login.html"
}


/*........AI match.....*/

import {matchProfiles} from "../src/matchAi.js";

const result = matchProfiles(currentUser, allUsers )

console.log ("Best Matches:", result);





/* ....dashboard with Ai....*/

import {db, auth } from "../src/firebase.js"
import { doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const matchContainer = document.getElementById("matchContainer")

async function localDashboard() {
  const user = auth.currentUser;

  if (!user) {
    alert(`Please login again`)
    window.location.href = "login.html"
    return;
  }

  const userRef = doc(db, "users", user.uid)
  const userSnap = await getDoc(userRef)
  const currentUser = userSnap.data()

  const allProfiles = [];
  const querySnapshot = await getDocs(collection(db, 'users'));

  querySnapshot.forEach(profileDoc => {
    allProfiles.push(profileDoc.data());
  });

  const result = matchProfiles(currentUser, allProfiles)
  renderMatches(result)
}

function renderMatches(matches) {
  matchContainer.innerHTML = ""

  if (matches.length === 0 ){
    matchContainer.innerHTML = "<p>no matches found</p>";
    return;
  }
  matches.slice(0,5).forEach(match => {
    const box = document.createElement('div')
    box.classList.add("match-box")


    box.innerHTML = `
      <h3>${match.name}</h3>
      <p>Role: ${match.role}</p>
      <p>Category: ${match.category}</p>
      <p>Tags: ${match.tags}</p>
      <p>Followers: ${match.followers}</p>
      <p>Match Score: ${match.score}</p>
    `;
    matchContainer.appendChild(box)
  })

}

auth.onAuthStateChanged(() => {
  localDashboard();
});

