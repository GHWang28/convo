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
  deleteField,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  limit
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firebaseDatabase } from '.';
import config from '../config.json';
import { genTag } from '../helpers';

export function recordNewUser (newUserData) {
  return setDoc(doc(firebaseDatabase, 'users', newUserData.uid), { ...newUserData, searchTerm: newUserData?.handle?.toUpperCase() }, { merge: true })
    .then(() => { toast.success('Profile saved.') })
    .catch((err) => { toast.error(err?.message) });
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
    if (showToast) toast.success('Channel joined.');
    return postMessageNotification(cid, uid, config.CHANNEL_JOIN_NID);
  }).catch((err) => {
    toast.error(`An error occurred when joining this channel: ${err.message}`);
  })
}

export function leaveUserFromChannel (uid, cid, showToast = true) {
  const docRefUID = doc(firebaseDatabase, 'users', uid);
  const docRefCID = doc(firebaseDatabase, 'channels', cid);

  const newEntryCID = {}, newEntryUID = {};
  newEntryCID[cid] = deleteField();
  newEntryUID[uid] = deleteField();

  return postMessageNotification(cid, uid, config.CHANNEL_LEAVE_NID)
    .then(() => {
      return Promise.all([
        setDoc(docRefUID, { uidToCid: newEntryCID }, { merge: true }),
        setDoc(docRefCID, { cidToUid: newEntryUID }, { merge: true })
      ])
    }).then(() => {
      if (showToast) toast.success('Channel left.');
    }).catch((err) => {
      toast.error(`An error occurred when leaving this channel: ${err.message}`);
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

export function clearUserCache () {
  for (let userKey in userCache) {
    delete userCache[userKey];
  }
}

export function getUser (uid, fetchFromDatabase = false, showError = true) {
  if (!fetchFromDatabase && userCache[uid]) {
    return Promise.resolve(userCache[uid]);
  }

  return getDoc(doc(firebaseDatabase, 'users', uid))
    .then((userData) => {
      if (!userData.exists()) throw new Error('User does not exist');
      const newData = {...userData.data()};
      userCache[uid] = newData;
      return newData;
    })
    .catch((error) => {
      if (showError) toast.error(error.message);
    })
}

export function postNewChannel (uid, newChannelInfo) {
  const docRef = doc(collection(firebaseDatabase, 'channels'));
  const cid = docRef.id;

  return setDoc(
    docRef,
    {
      ...newChannelInfo,
      searchTerm: newChannelInfo?.name?.toUpperCase(),
      tag: genTag(),
      iconIndex: Number(!newChannelInfo?.publicMode),
      cid,
      creatorUid: uid,
      dateCreated: serverTimestamp()
    }
  ).then(() => {
    return joinUserToChannel(uid, cid, false);
  }).then(() => {
    toast.success('Channel created successfully.')
  })
  .catch((error) => {
    toast.error(`Failed to create Channel: ${error.message}`)
  })
}

export function editChannel (newInfo, cid, uid) {
  return setDoc(doc(firebaseDatabase, 'channels', cid), { ...newInfo, searchTerm: newInfo?.name?.toUpperCase() }, { merge: true })
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
  if (!searchTerm) return Promise.resolve([]);
  if (searchTerm.charAt(0) === '#') {
    return getDocs(query(
      collection(firebaseDatabase, 'channels'),
      where('tag', '==', searchTerm.slice(1)),
      limit(1)
    )).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => (doc.data()));
    })
  }

  const searchTermUpper = searchTerm.toUpperCase();

  return getDocs(query(
    collection(firebaseDatabase, 'channels'),
    orderBy('searchTerm'),
    startAt(searchTermUpper),
    endAt(searchTermUpper + '\uf8ff'),
    where('publicMode', '==', true)
  )).then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => (doc.data()));
  })
}

export function searchUser (searchTerm) {
  if (!searchTerm) return Promise.resolve([]);
  if (searchTerm.charAt(0) === '#') {
    return getDocs(query(
      collection(firebaseDatabase, 'users'),
      where('tag', '==', searchTerm.slice(1)),
      limit(1)
    )).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => (doc.data()));
    })
  }

  const searchTermUpper = searchTerm.toUpperCase();

  return getDocs(query(
    collection(firebaseDatabase, 'users'),
    orderBy('searchTerm'),
    startAt(searchTermUpper),
    endAt(searchTermUpper + '\uf8ff'),
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
    cid,
    mid: newDoc.id
  }
  return setDoc(newDoc, messagePackage)
    .catch((err) => { toast.error(err?.message) });
}

export function deleteMessage (cid, mid) {
  return deleteDoc(doc(firebaseDatabase, 'channels', cid, 'messages', mid));
}

export function editMessage (newText, cid, mid) {
  return setDoc(
    doc(firebaseDatabase, 'channels', cid, 'messages', mid),
    { text: newText, timestampEdit: new Date() },
    { merge: true }
  )
}

export function postMessageNotification (cid, uid, nid) {
  const newDoc = doc(collection(firebaseDatabase, 'channels', cid, 'messages'));
  const notificationPackage = {
    timestamp: new Date(),
    uid,
    nid,
    cid,
    mid: newDoc.id
  }
  return setDoc(newDoc, notificationPackage);
}

export function postDelMessageReact (cid, mid, uid, rid, post = true) {
  const docRef = doc(firebaseDatabase, 'channels', cid, 'messages', mid);

  // Setting up data
  const newEntry = {}, newEntryValue = {};
  newEntryValue[uid] = (post) ? true : deleteField();
  newEntry[rid] = newEntryValue;

  return setDoc(docRef, { reactions: newEntry, reactionsOrder: arrayUnion(rid) }, { merge: true })
    .then(() => {
      if (post) return null;

      return getDoc(docRef)
      .then((doc) => {
        const data = doc.data();
        if (Object.keys(data?.reactions[rid]).length === 0) {
          // Delete react from database if there isn't any other reactions
          const deleteEntry = {};
          deleteEntry[rid] = deleteField();
          return setDoc(docRef, { reactions: deleteEntry, reactionsOrder: arrayRemove(rid) }, { merge: true });
        }
      });
    });
}

export function inviteUsersToChannel (inviterUID, arrayOfUID, cid) {
  const totalUsers = arrayOfUID.length;
  if (totalUsers === 0) {
    return Promise.resolve(null);
  }

  // Add total users to the invite notification ID to show how many users were invited
  return postMessageNotification(cid, inviterUID, config.CHANNEL_INVITE_NID + totalUsers)
    .then(() => (
      Promise.all(arrayOfUID.map((uid) => (
        joinUserToChannel(uid, cid, false)
      ))).then(() => {
        const totalUsers = arrayOfUID.length;
        toast.success(`Invited ${totalUsers} user${(totalUsers === 1) ? '' : 's'} to the channel.`)
      })
    ));
}

export function isUrlToImage (url) {
  const imgCheck = new Image();
  imgCheck.src = url;

  // Checks if image loads properly
  return new Promise((resolve) => {
    imgCheck.onerror = () => {
      resolve(false);
    }
    imgCheck.onload = () => {
      resolve(true);
    }
  })
}
