import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
  startAt,
  endAt,
  orderBy,
  deleteField
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firebaseDatabase } from '.';
import config from '../config.json';

export function recordNewUser (user) {
  const docRef = doc(firebaseDatabase, 'users', user.uid);
  return getDoc(docRef)
    .then((doc) => {
      if (!doc.exists()) {
        const newData = {
          handler: user.displayName,
          bio: '',
          profilePic: user.photoURL,
          uidToCid: {},
          uid: user.uid
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
  const docRefUID = doc(firebaseDatabase, 'users', uid);
  const docRefCID = doc(firebaseDatabase, 'channels', cid);

  const newEntryCID = {}, newEntryUID = {};
  newEntryCID[cid] = true;
  newEntryUID[uid] = true;

  return Promise.all([
    setDoc(docRefUID, { uidToCid: newEntryCID }, { merge: true }),
    setDoc(docRefCID, { cidToUid: newEntryUID }, { merge: true })
  ]).then(() => {
      if (showToast) toast.success('Channel joined.')
    })
    .catch(() => {
      toast.error('An error occurred when joining this channel.')
    })
}

export function leaveUserToChannel (uid, cid, showToast = true) {
  const docRefUID = doc(firebaseDatabase, 'users', uid);
  const docRefCID = doc(firebaseDatabase, 'channels', cid);

  const newEntryCID = {}, newEntryUID = {};
  newEntryCID[cid] = deleteField();
  newEntryUID[uid] = deleteField();

  return Promise.all([
    setDoc(docRefUID, { uidToCid: newEntryCID }, { merge: true }),
    setDoc(docRefCID, { cidToUid: newEntryUID }, { merge: true })
  ]).then(() => {
      if (showToast) toast.success('Channel left.')
    })
    .catch(() => {
      toast.error('An error occurred when leaving this channel.')
    })
}

export function getArrayOfUserData (uidArray) {
  return Promise.all(uidArray.map((uid) => (
      getUser(uid)
  )))
}

export function getIsUserInChannel (uid, cid) {
  const docRefUID = doc(firebaseDatabase, 'users', uid);
  const docRefCID = doc(firebaseDatabase, 'channels', cid);

  return Promise.all([
    getDoc(docRefUID),
    getDoc(docRefCID)
  ]).then(([userDoc, channelDoc]) => {
    if (!userDoc.data().uidToCid || !channelDoc.data().cidToUid) return false;
    return userDoc.data().uidToCid[cid] && channelDoc.data().cidToUid[uid]
  })
}

export function getChannelDocRef (cid) {
  return doc(firebaseDatabase, 'channels', cid || '0');
}

const userCache = {};

export function getUser (uid) {
  if (userCache[uid]) {
    return Promise.resolve(userCache[uid]);
  }

  return getDoc(doc(firebaseDatabase, 'users', uid))
    .then((userData) => {
      if (!userData.exists()) return null;
      const newData = {...userData.data()};
      userCache[uid] = newData;
      return newData;
    })
}

export function postNewChannel (name, description, theme, publicMode, uid) {
  const docRef = doc(collection(firebaseDatabase, 'channels'));
  const channelId = docRef.id;

  return setDoc(
    docRef,
    {
      name,
      description,
      publicMode,
      theme,
      iconIndex: Number(!publicMode),
      cid: channelId,
      dateCreated: serverTimestamp()
    }
  ).then(() => {
    return joinUserToChannel(uid, channelId, false);
  })
  .then(() => {
    toast.success('Channel created successfully.')
  })
}

export function editChannel (newInfo, cid, uid) {
  return setDoc(doc(firebaseDatabase, 'channels', cid), newInfo)
    .then(() => {
      return postMessageNotification(cid, uid, config.CHANNEL_EDIT_NID)
    }).then(() => {
      toast.success('Channel edited successfully.')
    })
}

/**
 * Searches for channels with similar name to the given search term and returns
 * a promise for all data of similar channel
 * @param {String} searchTerm 
 * @returns {Promise<QuerySnapshot<DocumentData>>}
 */
export function searchChannel (searchTerm) {
  const upperCaseTerm = searchTerm.toUpperCase();
  const lowerCaseTerm = searchTerm.toLowerCase();

  return getDocs(query(
    collection(firebaseDatabase, 'channels'),
    orderBy('name'),
    startAt(upperCaseTerm),
    endAt(lowerCaseTerm + '\uf8ff'),
    where('publicMode', '==', true)
  )).then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => (doc.data()));
  })
}

export function postMessage (cid, uid, message) {
  const newDoc = doc(collection(firebaseDatabase, 'channels', cid, 'messages'));
  const messagePackage = {
    ...message, 
    timestamp: new Date(),
    uid,
    mid: newDoc.id
  }
  return setDoc(newDoc, messagePackage);
}

export function postMessageNotification (cid, uid, nid) {
  const newDoc = doc(collection(firebaseDatabase, 'channels', cid, 'messages'));
  const notificationPackage = {
    timestamp: new Date(),
    uid,
    nid,
    mid: newDoc.id
  }
  return setDoc(newDoc, notificationPackage);
}

export function isUrlToImage (url) {
  const img = new Image();
  img.src = url;

  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}
