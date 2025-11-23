export function matchProfiles(user, allUsers) {
  let matches = [];
  
  const validPairs = [
    ["influencer", "sponsor"],
    ["organiser", "sponsor"],
    ["influencer", "organiser"]
  ];

  allUsers.forEach(other => {
    if (other.uid === user.uid) return;

    let score = 0;

    const pair1 = [user.role, other.role];
    const pair2 = [other.role, user.role];

    if (
      validPairs.some(
        p => (p[0] === pair1[0] && p[1] === pair1[1]) ||
             (p[0] === pair2[0] && p[1] === pair2[1])
      )
    ) {
      score += 50;
    }

    if (user.category === other.category) {
      score += 20;
    }

    const userTags = user.tags.split(",").map(t => t.trim().toLowerCase());
    const otherTags = (other.tags || "").split(",").map(t => t.trim().toLowerCase()).filter(Boolean);

    const commonTags = userTags.filter(tag => otherTags.includes(tag));

    score += commonTags.length * 10;

    const diff = Math.abs(user.followers - other.followers);

    if (diff <= 1000) score += 20;
    else if (diff <= 5000) score += 10;

    matches.push({
      uid: other.uid,
      name: other.name,
      role: other.role,
      category: other.category,
      tags: other.tags,
      followers: other.followers,
      score: score
    });
  });

  matches.sort((a, b) => b.score - a.score);

  return matches;
}


/*......Fetching all profiles....*/

import {db} from "./firebase"
import{ collections, data} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export async function getAllProfiles(){
  const snapshot = await getDocs(collections(db, "profiles"))
  let data = []
  snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data()}))
  return data;
} 