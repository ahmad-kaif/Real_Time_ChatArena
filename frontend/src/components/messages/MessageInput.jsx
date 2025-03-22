import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const { loading, sendMessage } = useSendMessage();

  // Handle File Selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() && !file) return;

    await sendMessage(message, file);
    
    setMessage('');
    setFile(null);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative flex items-center gap-2">
        {/* File Input */}
        <input 
          type="file" 
          accept="image/*, .pdf, .docx" 
          onChange={handleFileChange} 
          className="hidden" 
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="cursor-pointer bg-gray-700 text-white px-3 py-2 rounded-lg">
          📎
        </label>

        {/* Message Input */}
        <input
          type="text"
          placeholder="Send a message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send Button */}
        <button type="submit" className="flex items-center">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
