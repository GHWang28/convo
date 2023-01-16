import React, { Fragment, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { firebaseDatabase } from '../../../firebase';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessageLoad from '../../../components/MessageLoad';
import config from '../../../config.json';
import ChannelMessagesCollection from './ChannelMessagesCollection';

export default function ChannelMessages ({ channelData }) {
  const [reachedEarliestMsg, setReachedEarliestMsg] = useState(false);
  const [dateSeparations, setDateSeparations] = useState([new Date()]);

  const onLoadMore = useCallback(() => {
    getDocs(query(
      collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
      orderBy('timestamp', 'desc'),
      startAfter(dateSeparations.at(dateSeparations.length - 1)),
      limit(config.PAIGNATION_LENGTH)
    ))
      .then((oldMessages) => {
        return new Promise((resolve) => (setTimeout(() => { resolve(oldMessages) }, 200)))
      })
      .then((oldMessages) => {
        if (oldMessages.docs.length < config.PAIGNATION_LENGTH) {
          setReachedEarliestMsg(true);
          if (oldMessages.docs.length === 0) return;
        }
        setDateSeparations([...dateSeparations, oldMessages.docs[oldMessages.docs.length - 1]]);
      })
  }, [channelData?.cid, dateSeparations])

  // Attempt to load more if the page is empty
  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (!reachedEarliestMsg && messageContainer.scrollHeight <= messageContainer.clientHeight) {
      onLoadMore();
    }
  }, [onLoadMore, reachedEarliestMsg]);

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
        dataLength={dateSeparations.length}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        next={onLoadMore}
        hasMore={!reachedEarliestMsg}
        scrollableTarget='message-container'
        loader={<MessageLoad color={channelData?.theme} loading/>}
        endMessage={<MessageLoad color={channelData?.theme} />}
        inverse
      >
        {dateSeparations.map((date, index) => (
          <Fragment key={`msg-group-${index}`}>
            {(index === 0) && (
              <ChannelMessagesCollection channelData={channelData} separationFront={date} end />
            )}
            <ChannelMessagesCollection channelData={channelData} separationFront={date} separationEnd={dateSeparations.at(dateSeparations.length + 1) || null} />
          </Fragment>
        ))}
      </InfiniteScroll>
    </Box>
  )
}
