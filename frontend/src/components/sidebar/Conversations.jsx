import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';

const AI_FRIEND = {
  _id: 'ai_chat_friend', // Unique ID for AI chat
  fullName: 'AI Amigo',
  isAI: true, // Custom property to distinguish AI chat
};

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  // Include AI Chat Friend at the beginning
  const allConversations = [AI_FRIEND, ...conversations];

  return (
    <div className='py-3 flex flex-col overflow-auto'>
      {allConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === allConversations.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
};

export default Conversations;
