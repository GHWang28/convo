import React, { useState } from 'react';
import { Box } from '@mui/material';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseDatabase } from '../../../firebase';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessageLoad from '../../../components/MessageLoad';
import config from '../../../config.json';
import NotificationBubble from '../../../components/NotificationBubble';
import MessageBubble from '../../../components/MessageBubble';

export default function ChannelMessages ({ channelData }) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState([]);

  // Load messages on page number ubdate
  useEffect(() => {
    if (page === 0) return;

    return onSnapshot(query(
      collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
      orderBy('timestamp', 'desc'),
      limit(page * config.PAIGNATION_LENGTH)
    ), (querySnapshot) => {
      let newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push(doc.data());
      });
      setMessages(newMessages);
      setHasMore(newMessages.length === page * config.PAIGNATION_LENGTH);
    })
  }, [page, channelData?.cid])

  // Attempt to load more if the page is empty
  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messages.length === page * config.PAIGNATION_LENGTH && messageContainer.scrollHeight <= messageContainer.clientHeight) {
      setPage(page + 1);
    }
  }, [messages, page]);

  return (
    <Box
      id='message-container'
      sx={{
        flexGrow: 1,
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'scroll',
        pb: 2
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        next={() => { setPage(page + 1) }}
        hasMore={hasMore}
        scrollableTarget='message-container'
        scrollThreshold='50px'
        loader={<MessageLoad color={channelData?.theme} loading/>}
        endMessage={<MessageLoad color={channelData?.theme} />}
        inverse
      >
        {messages.map((messageItem, index) => (
          ((messageItem?.nid !== undefined) ? (
            <NotificationBubble key={messageItem.mid} color={channelData?.theme} notificationData={messageItem} />
          ) : (
            <MessageBubble
              arrow
              showOptions
              key={messageItem.mid}
              messageData={messageItem}
              color={channelData?.theme}
              isStart={(messages.at(index + 1)?.uid !== messageItem.uid) || (messages.at(index + 1)?.nid !== undefined) || separateByTimestamp(messages.at(index + 1)?.timestamp, messageItem?.timestamp)}
              isEnd={(index === 0) || (messages.at(index - 1)?.nid !== undefined) || (messages.at(index - 1)?.uid !== messageItem.uid) || separateByTimestamp(messages.at(index - 1)?.timestamp, messageItem?.timestamp)}
            />
          ))
        ))}
      </InfiniteScroll>
    </Box>
  )
}

function separateByTimestamp (timestampA, timestampB) {
  if (!timestampA || !timestampB) return true;
  return Math.abs(timestampA.seconds - timestampB.seconds) > config.MESSAGE_BUFFER_TIMESTAMP_SECONDS
}
