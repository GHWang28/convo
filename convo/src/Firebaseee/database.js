import { collection, doc, getDoc, getDocs, query, setDoc, where, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { firebaseDatabase } from ".";

export function recordNewUser (user) {
  const docRef = doc(firebaseDatabase, 'users', user.uid);
  return getDoc(docRef)
    .then((doc) => {
      if (!doc.exists()) {
        const newData = {
          handler: user.displayName,
          bio: '',
          profilePic: user.photoURL
        }
        return setDoc(
          docRef,
          newData
        ).then(() => {
          return newData;
        })

      } else {
        return doc.data();
      }
    })
}

export function joinUserToChannel (uid, cid) {
  const docRef = doc(collection(firebaseDatabase, 'channelUserRelationship'));
  return setDoc(docRef, { uid, cid })
    .catch(() => {
      toast.error('An error occurred when joining this channel')
    })
}

export function getUserChannel (uid) {
  return getDocs(query(collection(firebaseDatabase, 'channelUserRelationship'), where('uid', '==', uid)))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
}

export function getChannelUser (cid) {
  return getDocs(query(collection(firebaseDatabase, 'channelUserRelationship'), where('cid', '==', cid)))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    })
}

export function postNewChannel (channelName, description, publicMode, uid) {
  const docRef = doc(collection(firebaseDatabase, 'channels'));
  const channelId = docRef.id;

  return setDoc(
    docRef,
    {
      channelName,
      description,
      publicMode,
      dateCreated: serverTimestamp()
    }
  ).then(() => {
    return joinUserToChannel(uid, channelId);
  })
}
