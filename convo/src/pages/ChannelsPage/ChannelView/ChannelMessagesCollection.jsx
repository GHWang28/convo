import { collection, endBefore, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseDatabase } from "../../../firebase";
import config from '../../../config.json';
import NotificationBubble from "../../../components/NotificationBubble";
import MessageBubble from "../../../components/MessageBubble";

export default function ChannelMessagesCollection ({ channelData, separationFront, end }) {
  const queryArgs = [
    collection(firebaseDatabase, 'channels', channelData?.cid, 'messages'),
    orderBy('timestamp', 'desc'),
    (end) ? endBefore(separationFront) : startAfter(separationFront),
    limit(config.PAIGNATION_LENGTH)
  ] 

  const [messages, fetching] = useCollectionData(query(
    ...queryArgs.filter((_, index) => !(index === 3 && end))
  ));

  if (fetching) return null;

  return messages.map(
    (messageItem, index) => ((messageItem?.nid !== undefined) ? (
      <NotificationBubble key={messageItem.mid} color={channelData?.theme} notificationData={messageItem} />
    ) : (
      <MessageBubble
        arrow
        key={messageItem.mid}
        messageData={messageItem}
        color={channelData?.theme}
        isStart={(messages.at(index + 1)?.uid !== messageItem.uid) || (messages.at(index + 1)?.nid !== undefined) || separateByTimestamp(messages.at(index + 1)?.timestamp, messageItem?.timestamp)}
        isEnd={(index === 0) || (messages.at(index - 1)?.nid !== undefined) || (messages.at(index - 1)?.uid !== messageItem.uid) || separateByTimestamp(messages.at(index - 1)?.timestamp, messageItem?.timestamp)}
      />
    ))
  )
}

function separateByTimestamp (timestampA, timestampB) {
  if (!timestampA || !timestampB) return true;
  return Math.abs(timestampA.seconds - timestampB.seconds) > config.MESSAGE_BUFFER_TIMESTAMP_SECONDS
}
