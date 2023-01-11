import React, { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { collection, endBefore, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { firebaseDatabase } from '../../../../firebase';
import MessageBubble from '../../../../components/MessageBubble';
import { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessageLoad from '../../../../components/MessageLoad';
import config from '../../../../config.json';
import NotificationBubble from '../../../../components/NotificationBubble';

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
  const [nextQuery, setNextQuery] = useState(query(
    collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
    orderBy('timestamp', 'desc'),
    limit(config.PAIGNATION_LENGTH)
  ));

  const [incomingMessages, fetching] = useCollectionData(query(
    collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
    orderBy('timestamp', 'desc'),
    endBefore(state)
  ));

  const onLoadMore = useCallback(() => {
    if (!nextQuery) return;
    getDocs(nextQuery)
      .then((oldMessages) => {
        return new Promise((resolve) => (setTimeout(() => { resolve(oldMessages) }, 200)))
      })
      .then((oldMessages) => {
        setMessages([
          ...messages,
          ...oldMessages.docs.map((item) => ({ ...item.data() }))
        ]);
        handleNextQueryState(oldMessages, setNextQuery, channelData?.cid);
      })
  }, [messages, channelData?.cid, nextQuery])

  // Attempt to load more if the page is empty
  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (!fetching && Boolean(nextQuery) && messageContainer.scrollHeight <= messageContainer.clientHeight) {
      onLoadMore();
    }
  }, [nextQuery, onLoadMore, fetching]);

  const combined = (incomingMessages) ? (
    [...incomingMessages, ...messages]
  ) : (
    [...messages]
  )

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
        dataLength={combined.length}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        next={onLoadMore}
        hasMore={Boolean(nextQuery)}
        scrollableTarget='message-container'
        loader={<MessageLoad color={channelData?.theme} loading/>}
        endMessage={<MessageLoad color={channelData?.theme} />}
        inverse
      >
        {combined.map((messageItem, index) => (
          (messageItem?.nid !== undefined) ? (
            <NotificationBubble key={messageItem.mid} color={channelData?.theme} notificationData={messageItem} />
          ) : (
            <MessageBubble
              arrow
              key={messageItem.mid}
              messageData={messageItem}
              color={channelData?.theme}
              isStart={(combined.at(index + 1)?.uid !== messageItem.uid) || (combined.at(index + 1)?.nid !== undefined) || separateByTimestamp(combined.at(index + 1)?.timestamp, messageItem?.timestamp)}
              isEnd={(index === 0) || (combined.at(index - 1)?.nid !== undefined) || (combined.at(index - 1)?.uid !== messageItem.uid) || separateByTimestamp(combined.at(index - 1)?.timestamp, messageItem?.timestamp)}
            />
          )
        ))}
      </InfiniteScroll>
    </Box>
  )
}

function separateByTimestamp (timestampA, timestampB) {
  if (!timestampA || !timestampB) return true;
  return Math.abs(timestampA.seconds - timestampB.seconds) > config.MESSAGE_BUFFER_TIMESTAMP_SECONDS
}
