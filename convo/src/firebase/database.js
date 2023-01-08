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
    where('channelName', '>=', upperCaseTerm),
    where('channelName', '<=', lowerCaseTerm),
    where('publicMode', '==', true)
  )).then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({...doc.data(), cid: doc.id}));
  })
}
