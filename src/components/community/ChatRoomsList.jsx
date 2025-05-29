import { useState } from 'react';
import { FiPlus, FiHash, FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ChatRoomsList = ({ rooms, activeRoomId, onSelectRoom, onAddRoom, isAdmin }) => {
  const { theme } = useTheme();
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      onAddRoom({
        name: newRoomName.trim(),
        description: newRoomDescription.trim()
      });
      setNewRoomName('');
      setNewRoomDescription('');
      setShowAddRoom(false);
    }
  };

  return (
    <div className={`h-full ${theme === 'dark' ? 'bg-dark' : 'bg-light'} border-r ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Chat Rooms</h2>
        {isAdmin && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddRoom(!showAddRoom)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-dark-lighter' : 'hover:bg-light-darker'}`}
            aria-label="Add chat room"
          >
            <FiPlus />
          </motion.button>
        )}
      </div>
      
      {showAddRoom && (
        <div className="p-4 border-b">
          <form onSubmit={handleAddRoom}>
            <div className="mb-3">
              <label htmlFor="roomName" className="block text-sm font-medium mb-1">Room Name</label>
              <input
                id="roomName"
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="general"
                className="input"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomDescription" className="block text-sm font-medium mb-1">Description (optional)</label>
              <input
                id="roomDescription"
                type="text"
                value={newRoomDescription}
                onChange={(e) => setNewRoomDescription(e.target.value)}
                placeholder="General discussion"
                className="input"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddRoom(false)}
                className={`px-3 py-1 rounded ${theme === 'dark' ? 'hover:bg-dark-lighter' : 'hover:bg-light-darker'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-primary text-white"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        <ul className="p-2">
          {rooms.map(room => (
            <li key={room.id}>
              <button
                onClick={() => onSelectRoom(room.id)}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                  activeRoomId === room.id 
                    ? 'bg-primary bg-opacity-20' 
                    : theme === 'dark' ? 'hover:bg-dark-lighter' : 'hover:bg-light-darker'
                }`}
              >
                <div className="flex items-center">
                  <FiHash className="mr-2 opacity-70" />
                  <span>{room.name}</span>
                </div>
                {isAdmin && (
                  <FiSettings className="opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatRoomsList;
