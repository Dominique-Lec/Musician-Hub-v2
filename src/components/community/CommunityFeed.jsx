import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiHeart, FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const CommunityFeed = ({ posts, onAddPost, onLikePost, onCommentPost, isAdmin }) => {
  const { theme } = useTheme();
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  
  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostContent.trim()) {
      onAddPost({
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
        image: newPostImage
      });
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostImage(null);
      setShowAddPost(false);
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Community Feed</h2>
        {isAdmin && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddPost(!showAddPost)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-dark-lighter' : 'hover:bg-light-darker'}`}
            aria-label="Add post"
          >
            <FiPlus />
          </motion.button>
        )}
      </div>
      
      {/* Add Post Form */}
      {showAddPost && (
        <div className="p-4 border-b">
          <form onSubmit={handleAddPost}>
            <div className="mb-3">
              <label htmlFor="postTitle" className="block text-sm font-medium mb-1">Post Title</label>
              <input
                id="postTitle"
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Announcement title"
                className="input"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postContent" className="block text-sm font-medium mb-1">Content</label>
              <textarea
                id="postContent"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share news with your community..."
                className="input"
                rows="4"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postImage" className="block text-sm font-medium mb-1">Image (optional)</label>
              <input
                id="postImage"
                type="file"
                accept="image/*"
                onChange={(e) => setNewPostImage(e.target.files[0])}
                className={`w-full p-2 border rounded ${theme === 'dark' ? 'border-gray-700 bg-dark-lighter' : 'border-gray-300 bg-light'}`}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddPost(false)}
                className={`px-3 py-1 rounded ${theme === 'dark' ? 'hover:bg-dark-lighter' : 'hover:bg-light-darker'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-primary text-white"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Posts List */}
      <div className="overflow-y-auto flex-grow p-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No announcements yet</p>
            {isAdmin && (
              <button
                onClick={() => setShowAddPost(true)}
                className="mt-2 text-primary hover:underline"
              >
                Create your first announcement
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-dark-lighter' : 'bg-light-darker'}`}>
                {post.image && (
                  <div className="w-full h-48 bg-gray-800 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <div className="flex items-center text-sm opacity-70 mt-1">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-5 h-5 rounded-full mr-2"
                        />
                        <span>{post.author.name}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button 
                          className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                          aria-label="Edit post"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button 
                          className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                          aria-label="Delete post"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div className="flex gap-4">
                      <button 
                        onClick={() => onLikePost(post.id)}
                        className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100"
                      >
                        <FiHeart className={post.liked ? "text-red-500 fill-current" : ""} />
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        onClick={() => onCommentPost(post.id)}
                        className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100"
                      >
                        <FiMessageSquare />
                        <span>{post.comments.length}</span>
                      </button>
                    </div>
                    <button 
                      className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100"
                      aria-label="Share post"
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
