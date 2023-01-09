import React, { useState } from 'react';
import { Box } from '@mui/material';
import { collection, endBefore, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { firebaseDatabase } from '../../../../firebase';
import MessageBubble from '../../../../components/MessageBubble';
import { useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessageLoad from '../../../../components/MessageLoad';
import config from '../../../../config.json';

const handleNextQueryState = (oldMessages, setNextQuery, cid) => {
  setNextQuery((oldMessages.docs.length < config.PAIGNATION_LENGTH) ? (
    null
  ) : (
    query(
      collection(firebaseDatabase, 'channels', cid, 'messages'),
      orderBy('timestamp', 'desc'),
      startAfter(oldMessages.docs[oldMessages.docs.length - 1]),
      limit(config.PAIGNATION_LENGTH)
    )
  ));
}

export default function ChannelMessages ({ channelData }) {
  const [messages, setMessages] = useState([]);
  const [state] = useState(new Date());
  const [nextQuery, setNextQuery] = useState(null);

  const [incomingMessages] = useCollection(query(
    collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
    orderBy('timestamp', 'desc'),
    endBefore(state)
  ));

  const onLoadMore = () => {
    if (!nextQuery) return;
    getDocs(nextQuery)
      .then((oldMessages) => {
        return new Promise((resolve) => (setTimeout(() => { resolve(oldMessages) }, 100)))
      })
      .then((oldMessages) => {
        setMessages([
          ...messages,
          ...oldMessages.docs
        ]);
        handleNextQueryState(oldMessages, setNextQuery, channelData?.cid);
      })
  }

  useEffect(() => {
    getDocs(query(
      collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
      orderBy('timestamp', 'desc'),
      limit(config.PAIGNATION_LENGTH)
    )).then((oldMessages) => {
      setMessages([...oldMessages.docs]);
      handleNextQueryState(oldMessages, setNextQuery, channelData?.cid);
    })
  }, [channelData?.cid]);

  return (
    <Box
      id='message-container'
      sx={{
        flexGrow: 1,
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        overflow: 'auto',
        pb: 2
      }}
    >
      <InfiniteScroll
        dataLength={(incomingMessages?.docs?.length || 0) + messages.length}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        next={onLoadMore}
        hasMore={Boolean(nextQuery)}
        scrollableTarget='message-container'
        loader={<MessageLoad publicMode={channelData?.publicMode} loading/>}
        endMessage={<MessageLoad publicMode={channelData?.publicMode} />}
        inverse
      >
        {incomingMessages && incomingMessages.docs.map((messageItem) => (
          <MessageBubble arrow key={messageItem.id} messageData={messageItem.data()} publicMode={channelData?.publicMode} />
        ))}
        {messages && messages.map((messageItem) => (
          <MessageBubble arrow key={messageItem.id} messageData={messageItem.data()} publicMode={channelData?.publicMode} />
        ))}
      </InfiniteScroll>
    </Box>
  )
}
