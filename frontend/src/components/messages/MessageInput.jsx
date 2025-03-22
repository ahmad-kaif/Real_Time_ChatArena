import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
// import axios from 'axios';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  // const [image, setImage] = useState(null);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message) {
      // Send text message
      await sendMessage(message);
      setMessage('');
    }

    // if (image) {
    //   await handleFileUpload(image); // Send the image after uploading
    //   setImage(null);  // Reset the image after sending
    // }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };

  // const handleFileUpload = async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     // Upload the image to the server
  //     const response = await fetch('/api/messages/uploads', {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`,  // assuming the token is stored here
  //       },
  //     });
  //     const data = await response.json();
  //     if (data.fileUrl) {
  //       // Send image URL as a message
  //       await sendMessage(data.fileUrl, 'image');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute bottom-0 left-0 ml-2"
        /> */}

        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
