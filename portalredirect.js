import {auth, db } from "./firebase"
import { getDoc, doc } from "firebase/firestore";

// Redirects user to appropriate dashboard based on their role after authentication
auth.onAuthStateChanged(async (user) => {
  if(!user){
    window.location.href = "login.html"
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  const data = snap.data();

  if (!data){
    window.location.href = "login.html"
    return;
  }

  if (data.role === 'influencer'){
    window.location.href = "influencer_dashboard.html"
  }
  else if (data.role === 'organiser'){
    window.location.href ="organiser_dashboard.html"
  }
  else if (data.role === "sponsor"){
    window.location.href = "sponsor_dashboard.html"
  }

});