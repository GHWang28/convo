import { Box, Typography } from '@mui/material';
import { collection, endBefore, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, startAfter } from 'firebase/firestore';
import { firebaseDatabase } from '../../../../firebase';
import React, { useState } from 'react';
import MessageBubble from '../../../../components/MessageBubble';
import { useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessageLoad from '../../../../components/MessageLoad';

export default function ChannelMessages ({ channelData }) {
  const [messages, setMessages] = useState([]);
  const [state] = useState(new Date());
  const [nextQuery, setNextQuery] = useState(query(
    collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
    orderBy('timestamp', 'desc'),
    limit(20)
  ));
  const [incomingMessage] = useCollection(query(
    collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
    orderBy('timestamp', 'desc'),
    endBefore(state)
  ));

  const onLoadMore = () => {
    if (!nextQuery) return;
    getDocs(nextQuery)
      .then((newMessages) => {
        return new Promise((resolve) => (setTimeout(() => { resolve(newMessages) }, 100)))
      })
      .then((newMessages) => {
        setMessages([
          ...messages,
          ...newMessages.docs
        ]);
        setNextQuery((newMessages.docs.length < 20) ? (
          null
        ) : (
          query(
            collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
            orderBy('timestamp', 'desc'),
            startAfter(newMessages.docs[newMessages.docs.length - 1]),
            limit(20)
          )
        ));
      })
  }
  useEffect(onLoadMore, []);

  return (
    <Box
      id='message-container'
      sx={{
        flexGrow: 1,
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        overflow: 'auto'
      }}
    >
      <InfiniteScroll
        dataLength={(incomingMessage?.docs?.length || 0) + messages.length}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        next={onLoadMore}
        hasMore={Boolean(nextQuery)}
        scrollableTarget='message-container'
        loader={<MessageLoad publicMode={channelData?.publicMode} loading/>}
        endMessage={<MessageLoad publicMode={channelData?.publicMode} />}
        inverse
      >
        {incomingMessage && [...incomingMessage.docs].map((messageItem) => (
          <MessageBubble arrow key={messageItem.id} messageData={messageItem.data()} publicMode={channelData?.publicMode} />
        ))}
        {[...messages].map((messageItem) => (
          <MessageBubble arrow key={messageItem.id} messageData={messageItem.data()} publicMode={channelData?.publicMode} />
        ))}
      </InfiniteScroll>
    </Box>
  )
}
