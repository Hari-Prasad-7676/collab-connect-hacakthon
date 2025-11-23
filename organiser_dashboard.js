import { auth, db} from "./firebase"
import {doc, getDoc, collection, getDocs} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js" ; 
import { getMatchScores } from "./matchAi.js";

async function loadOrganiserDashboard() {

  const user = auth.currentUser;
  if(!user) return ;

  const meSnap = await getDoc(doc(db, "profiles", user.uid))
  const me = meSnap.data();
  
  const snapshot = await(getDocs(collection(db, "profiles")))
  let all = []
  snapshot.docs.forEach(docu => all.push(docu.data())) 

  let others = all.filter(p=>p.uid !== user.uid && p.role !== "organiser" )
  
  others = others.map (p => ({
    ...p,
    score : getMatchScores(me, p) 
  }))
  console.log("Organiser match : ", others)
}

loadOrganiserDashboard()