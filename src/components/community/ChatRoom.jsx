import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiVideo, FiMonitor, FiPhone, FiPhoneOff, FiDollarSign, FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ChatRoom = ({ room, onSendMessage }) => {
  const { darkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState(null); // 'audio', 'video', or null
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showServicePanel, setShowServicePanel] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const messagesEndRef = useRef(null);

  // Sample services for demo
  const availableServices = [
    {
      id: 1,
      title: "Guitar Lessons",
      description: "1-on-1 guitar lessons for beginners to advanced players",
      price: 25,
      deliveryTime: "30 minutes",
      provider: "John Doe"
    },
    {
      id: 2,
      title: "Mix & Master Track",
      description: "Professional mixing and mastering for your song",
      price: 50,
      deliveryTime: "3 days",
      provider: "John Doe"
    }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [room?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(room.id, message);
      setMessage('');
    }
  };

  const toggleCall = (type) => {
    if (isInCall && callType === type) {
      // End current call
      setIsInCall(false);
      setCallType(null);
      setIsScreenSharing(false);
    } else {
      // Start new call or switch call type
      setIsInCall(true);
      setCallType(type);
    }
  };

  const toggleScreenShare = () => {
    if (isInCall) {
      setIsScreenSharing(!isScreenSharing);
    }
  };

  const toggleServicePanel = () => {
    setShowServicePanel(!showServicePanel);
  };

  const selectService = (service) => {
    setActiveService(service);
  };

  const offerService = () => {
    if (activeService) {
      // In a real app, this would create a service offer in the chat
      onSendMessage(room.id, `I'd like to offer my "${activeService.title}" service for $${activeService.price}`);
      setActiveService(null);
      setShowServicePanel(false);
    }
  };

  const requestService = () => {
    // In a real app, this would create a service request in the chat
    onSendMessage(room.id, "I'm looking for someone who can help with music production. Is anyone available?");
  };

  return (
    <div className={`flex flex-col h-full rounded-xl overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-dark-lighter' : 'bg-white'
    }`}>
      {/* Room header */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center`}>
        <div>
          <h2 className="text-lg font-semibold"># {room?.name}</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{room?.description}</p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleCall('audio')}
            className={`p-2 rounded-full transition-all duration-200 ${
              isInCall && callType === 'audio' 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : darkMode 
                  ? 'bg-dark hover:bg-dark-lighter text-gray-400 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
            }`}
            aria-label="Audio call"
          >
            {isInCall && callType === 'audio' ? <FiPhoneOff /> : <FiPhone />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleCall('video')}
            className={`p-2 rounded-full transition-all duration-200 ${
              isInCall && callType === 'video' 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : darkMode 
                  ? 'bg-dark hover:bg-dark-lighter text-gray-400 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
            }`}
            aria-label="Video call"
          >
            <FiVideo />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleScreenShare}
            className={`p-2 rounded-full transition-all duration-200 ${
              isScreenSharing 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : darkMode 
                  ? 'bg-dark hover:bg-dark-lighter text-gray-400 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
            }`}
            disabled={!isInCall}
            aria-label="Share screen"
          >
            <FiMonitor />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleServicePanel}
            className={`p-2 rounded-full transition-all duration-200 ${
              showServicePanel 
                ? 'bg-secondary text-white shadow-md shadow-secondary/30' 
                : darkMode 
                  ? 'bg-dark hover:bg-dark-lighter text-gray-400 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
            }`}
            aria-label="Service options"
          >
            <FiDollarSign />
          </motion.button>
        </div>
      </div>
      
      {/* Call area (shown when in a call) */}
      {isInCall && (
        <div className={`p-4 ${darkMode ? 'bg-dark' : 'bg-gray-50'} flex flex-wrap gap-4 justify-center`}>
          {callType === 'video' ? (
            <>
              <div className="relative w-full md:w-1/2 aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center shadow-lg">
                <span className="text-gray-400">Your camera</span>
                {isScreenSharing && (
                  <div className="absolute bottom-2 right-2 w-32 aspect-video bg-gray-700 rounded-md flex items-center justify-center text-xs shadow-md">
                    Screen share
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-gray-400">Other participants</span>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-center p-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white text-xl font-bold mb-2 shadow-lg shadow-primary/30">
                  JD
                </div>
                <span className={darkMode ? 'text-light' : 'text-dark'}>John Doe</span>
                <span className="text-sm text-gray-400">Speaking...</span>
              </div>
            </div>
          )}
          
          <div className="w-full flex justify-center mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCall(callType)}
              className="px-4 py-2 bg-accent text-white rounded-full flex items-center gap-2 shadow-md shadow-accent/30 hover:bg-accent-dark transition-all duration-200"
            >
              <FiPhoneOff /> End Call
            </motion.button>
          </div>
        </div>
      )}

      {/* Service panel */}
      {showServicePanel && (
        <div className={`p-4 ${darkMode ? 'bg-dark' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Service Options</h3>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={requestService}
                className="px-3 py-1 text-sm bg-accent text-white rounded-md flex items-center gap-1 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <FiClock size={14} /> Request Service
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={offerService}
                className={`px-3 py-1 text-sm bg-secondary text-white rounded-md flex items-center gap-1 shadow-sm hover:shadow-md transition-all duration-200 ${!activeService ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!activeService}
              >
                <FiCheckCircle size={14} /> Offer Selected
              </motion.button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableServices.map(service => (
              <motion.div 
                key={service.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => selectService(service)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeService?.id === service.id 
                    ? 'bg-secondary/10 border-2 border-secondary shadow-md' 
                    : darkMode 
                      ? 'bg-dark-lighter hover:bg-dark-lighter/80 border border-gray-800' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow'
                }`}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">{service.title}</h4>
                  <span className={`font-bold ${activeService?.id === service.id ? 'text-secondary' : 'text-primary'}`}>
                    ${service.price}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {service.description}
                </p>
                <div className={`flex items-center mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  <FiClock className="mr-1" /> {service.deliveryTime}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Messages area */}
      <div className={`flex-grow overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-dark-lighter' : 'bg-gray-50'}`}>
        {room?.messages?.map((msg, index) => (
          <div key={index} className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            {/* Service offer message */}
            {msg.content.includes("service") ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[80%] rounded-lg p-3 shadow-md ${
                  msg.isCurrentUser 
                    ? 'bg-secondary/20 border border-secondary text-secondary-dark rounded-tr-none' 
                    : darkMode 
                      ? 'bg-dark border border-gray-700 rounded-tl-none' 
                      : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                {!msg.isCurrentUser && (
                  <div className="font-semibold text-sm mb-1">{msg.sender}</div>
                )}
                <div className="flex items-center mb-2">
                  <FiDollarSign className={`mr-1 ${msg.isCurrentUser ? 'text-secondary' : 'text-primary'}`} />
                  <span className="font-semibold">Service Offer</span>
                </div>
                <p>{msg.content}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className={`text-xs ${msg.isCurrentUser ? 'text-secondary-dark' : 'text-gray-500'}`}>
                    {msg.timestamp}
                  </div>
                  {!msg.isCurrentUser && (
                    <div className="flex space-x-2">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-2 py-1 bg-secondary text-white text-xs rounded shadow-sm"
                      >
                        Accept
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-2 py-1 bg-gray-600 text-white text-xs rounded shadow-sm"
                      >
                        Decline
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              // Regular message
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[80%] rounded-lg p-3 shadow-md ${
                  msg.isCurrentUser 
                    ? 'bg-gradient-to-r from-primary to-primary-light text-white rounded-tr-none' 
                    : darkMode 
                      ? 'bg-dark border border-gray-700 rounded-tl-none' 
                      : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                {!msg.isCurrentUser && (
                  <div className="font-semibold text-sm mb-1">{msg.sender}</div>
                )}
                <p>{msg.content}</p>
                <div className={`text-xs mt-1 ${msg.isCurrentUser ? 'text-primary-100' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </div>
              </motion.div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className={`p-4 border-t ${darkMode ? 'border-gray-800 bg-dark' : 'border-gray-200 bg-white'} flex items-center gap-2`}>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className={`p-2 rounded-full ${
            darkMode 
              ? 'hover:bg-dark-lighter text-gray-400 hover:text-gray-300' 
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
          }`}
          aria-label="Attach file"
        >
          <FiFileText />
        </motion.button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={`input flex-grow ${
            darkMode 
              ? 'bg-dark-lighter border-gray-700 focus:ring-primary' 
              : 'bg-gray-50 border-gray-200 focus:ring-primary'
          }`}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className={`p-2 rounded-full ${
            darkMode 
              ? 'hover:bg-dark-lighter text-gray-400 hover:text-gray-300' 
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
          }`}
          aria-label="Voice message"
        >
          <FiMic />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="p-3 rounded-full bg-gradient-to-r from-primary to-primary-light text-white shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
          aria-label="Send message"
        >
          <FiSend />
        </motion.button>
      </form>
    </div>
  );
};

export default ChatRoom;
