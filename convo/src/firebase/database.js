import { collection, doc, getDoc, getDocs, query, setDoc, where, serverTimestamp, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { firebaseDatabase } from ".";
import { setFetching } from "../redux/actions";

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

export function joinUserToChannel (uid, cid, showToast = true) {
  const docRef = doc(collection(firebaseDatabase, 'channelUserRelationship'));
  return setDoc(docRef, { uid, cid })
    .then(() => {
      if (showToast) toast.success('Channel joined.')
    })
    .catch(() => {
      toast.error('An error occurred when joining this channel.')
    })
}

/**
 * Returns a promise with channel data of all channels the current uid is in
 * @param {String} uid 
 * @returns 
 */
export function getUserChannel (uid) {
  return getDocs(query(collection(firebaseDatabase, 'channelUserRelationship'), where('uid', '==', uid)))
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data().cid);
    }).then((channelIds) => {
      return Promise.all(
        channelIds.map((cid) => (
          getDoc(doc(firebaseDatabase, 'channels', cid))
            .then((channelData) => (
              {...channelData.data(), cid}
            ))
        ))
      )
    })
}

export function subscribeToChannelList (uid, setChannels, dispatch) {
  if (!uid) return;

  return onSnapshot(query(collection(firebaseDatabase, 'channelUserRelationship'), where('uid', '==', uid)), () => {
    dispatch(setFetching(true));
    getUserChannel(uid)
      .then((allChannelData) => {
        setChannels(allChannelData);
      })
      .finally(() => {
        dispatch(setFetching(false));
      })
  })
}

export function getChannelUser (cid) {
  return getDocs(query(collection(firebaseDatabase, 'channelUserRelationship'), where('cid', '==', cid)))
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data().uid);
    }).then((userIds) => {
      return Promise.all(
        userIds.map((uid) => (
          getDoc(doc(firebaseDatabase, 'users', uid))
            .then((userData) => (
              {...userData.data(), uid}
            ))
        ))
      )
    })
}

export function getChannel (cid) {
  const docRef = doc(firebaseDatabase, 'channels', cid);
  return getDoc(docRef)
    .then((channelData) => {
      if (!channelData.exists()) return null;
      return { ...channelData.data(), cid: channelData.id }
    })
}

const userCache = {};

export function getUser (uid) {
  if (userCache[uid]) {
    return Promise.resolve(userCache[uid]);
  }

  return getDoc(doc(firebaseDatabase, 'users', uid))
    .then((userData) => {
      if (!userData.exists()) return null;
      const newData = {...userData.data(), uid};
      userCache[uid] = newData;
      return newData;
    })
}

export function postNewChannel (name, description, publicMode, uid) {
  const docRef = doc(collection(firebaseDatabase, 'channels'));
  const channelId = docRef.id;

  return setDoc(
    docRef,
    {
      name,
      description,
      publicMode,
      dateCreated: serverTimestamp()
    }
  ).then(() => {
    return joinUserToChannel(uid, channelId, false);
  })
  .then(() => {
    toast.success('Channel created successfully.')
  })
}

/**
 * 
 * @param {String} searchTerm 
 * @returns 
 */
export function searchChannel (searchTerm) {
  const upperCaseTerm = searchTerm.toUpperCase();
  const lowerCaseTerm = searchTerm.toLowerCase();

  return getDocs(query(
    collection(firebaseDatabase, 'channels'),
    where('name', '>=', upperCaseTerm),
    where('name', '<=', lowerCaseTerm),
    where('publicMode', '==', true)
  )).then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({...doc.data(), cid: doc.id}));
  })
}

export function postMessage (cid, uid, text) {
  const messagePackage = {
    text, 
    timestamp: serverTimestamp(),
    uid
  }

  return setDoc(doc(collection(firebaseDatabase, 'channels', cid, 'messages')), messagePackage);
}

export function isUrlToImage (url) {
  const img = new Image();
  img.src = url;

  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}
