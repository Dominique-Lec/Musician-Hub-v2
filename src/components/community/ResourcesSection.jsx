import { useState } from 'react';
import { FiFolder, FiFile, FiPlus, FiSettings, FiLock, FiDollarSign, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ResourcesSection = ({ resources, folders, onAddFolder, onAddResource, isAdmin }) => {
  const { theme } = useTheme();
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [showFolderSettings, setShowFolderSettings] = useState(false);
  
  // New folder form state
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderPermission, setNewFolderPermission] = useState('admin-only');
  
  // New resource form state
  const [newResourceName, setNewResourceName] = useState('');
  const [newResourceDescription, setNewResourceDescription] = useState('');
  const [newResourceType, setNewResourceType] = useState('free');
  const [newResourcePrice, setNewResourcePrice] = useState('');
  const [newResourceFile, setNewResourceFile] = useState(null);
  
  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };
  
  const handleAddFolder = (e) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      onAddFolder({
        name: newFolderName.trim(),
        permission: newFolderPermission
      });
      setNewFolderName('');
      setNewFolderPermission('admin-only');
      setShowAddFolder(false);
    }
  };
  
  const handleAddResource = (e) => {
    e.preventDefault();
    if (newResourceName.trim() && selectedFolder) {
      onAddResource(selectedFolder, {
        name: newResourceName.trim(),
        description: newResourceDescription.trim(),
        type: newResourceType,
        price: newResourceType === 'paid' ? parseFloat(newResourcePrice) : 0,
        file: newResourceFile
      });
      setNewResourceName('');
      setNewResourceDescription('');
      setNewResourceType('free');
      setNewResourcePrice('');
      setNewResourceFile(null);
      setShowAddResource(false);
    }
  };
  
  const openAddResourceModal = (folderId) => {
    setSelectedFolder(folderId);
    setShowAddResource(true);
  };
  
  const openFolderSettings = (folder) => {
    setSelectedFolder(folder.id);
    setNewFolderPermission(folder.permission);
    setShowFolderSettings(true);
  };
  
  const handleUpdateFolderSettings = (e) => {
    e.preventDefault();
    // Update folder settings logic would go here
    setShowFolderSettings(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Resources</h2>
        {isAdmin && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddFolder(!showAddFolder)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-dark-lighter' : 'hover:bg-light-darker'}`}
            aria-label="Add folder"
          >
            <FiPlus />
          </motion.button>
        )}
      </div>
      
      {/* Add Folder Form */}
      {showAddFolder && (
        <div className="p-4 border-b">
          <form onSubmit={handleAddFolder}>
            <div className="mb-3">
              <label htmlFor="folderName" className="block text-sm font-medium mb-1">Folder Name</label>
              <input
                id="folderName"
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Tutorials"
                className="input"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="folderPermission" className="block text-sm font-medium mb-1">Who can add resources?</label>
              <select
                id="folderPermission"
                value={newFolderPermission}
                onChange={(e) => setNewFolderPermission(e.target.value)}
                className="input"
              >
                <option value="admin-only">Admins only</option>
                <option value="members">All community members</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddFolder(false)}
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
      
      {/* Folder Settings Modal */}
      {showFolderSettings && (
        <div className="p-4 border-b">
          <form onSubmit={handleUpdateFolderSettings}>
            <h3 className="font-medium mb-3">Folder Settings</h3>
            <div className="mb-3">
              <label htmlFor="editFolderPermission" className="block text-sm font-medium mb-1">Who can add resources?</label>
              <select
                id="editFolderPermission"
                value={newFolderPermission}
                onChange={(e) => setNewFolderPermission(e.target.value)}
                className="input"
              >
                <option value="admin-only">Admins only</option>
                <option value="members">All community members</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowFolderSettings(false)}
                className={`px-3 py-1 rounded ${theme === 'dark' ? 'hover:bg-dark-lighter' : 'hover:bg-light-darker'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-primary text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Add Resource Modal */}
      {showAddResource && (
        <div className="p-4 border-b">
          <form onSubmit={handleAddResource}>
            <h3 className="font-medium mb-3">Add New Resource</h3>
            <div className="mb-3">
              <label htmlFor="resourceName" className="block text-sm font-medium mb-1">Resource Name</label>
              <input
                id="resourceName"
                type="text"
                value={newResourceName}
                onChange={(e) => setNewResourceName(e.target.value)}
                placeholder="Beginner's Guide"
                className="input"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="resourceDescription" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="resourceDescription"
                value={newResourceDescription}
                onChange={(e) => setNewResourceDescription(e.target.value)}
                placeholder="A guide for beginners..."
                className="input"
                rows="2"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Resource Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="resourceType"
                    value="free"
                    checked={newResourceType === 'free'}
                    onChange={() => setNewResourceType('free')}
                    className="mr-2"
                  />
                  Free
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="resourceType"
                    value="paid"
                    checked={newResourceType === 'paid'}
                    onChange={() => setNewResourceType('paid')}
                    className="mr-2"
                  />
                  Paid
                </label>
              </div>
            </div>
            {newResourceType === 'paid' && (
              <div className="mb-3">
                <label htmlFor="resourcePrice" className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                  id="resourcePrice"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={newResourcePrice}
                  onChange={(e) => setNewResourcePrice(e.target.value)}
                  placeholder="9.99"
                  className="input"
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="resourceFile" className="block text-sm font-medium mb-1">Upload File</label>
              <input
                id="resourceFile"
                type="file"
                onChange={(e) => setNewResourceFile(e.target.files[0])}
                className={`w-full p-2 border rounded ${theme === 'dark' ? 'border-gray-700 bg-dark-lighter' : 'border-gray-300 bg-light'}`}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddResource(false)}
                className={`px-3 py-1 rounded ${theme === 'dark' ? 'hover:bg-dark-lighter' : 'hover:bg-light-darker'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-primary text-white"
              >
                Add Resource
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Folders and Resources List */}
      <div className="overflow-y-auto flex-grow p-4">
        {folders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No resource folders yet</p>
            {isAdmin && (
              <button
                onClick={() => setShowAddFolder(true)}
                className="mt-2 text-primary hover:underline"
              >
                Create your first folder
              </button>
            )}
          </div>
        ) : (
          <ul className="space-y-2">
            {folders.map(folder => (
              <li key={folder.id} className={`rounded-lg ${theme === 'dark' ? 'bg-dark-lighter' : 'bg-light-darker'}`}>
                <div 
                  className="p-3 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleFolder(folder.id)}
                >
                  <div className="flex items-center">
                    <FiFolder className="mr-2 text-primary" />
                    <span>{folder.name}</span>
                    {folder.permission === 'admin-only' && (
                      <FiLock className="ml-2 text-xs opacity-70" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddResourceModal(folder.id);
                          }}
                          className="p-1 rounded-full hover:bg-gray-700"
                          aria-label="Add resource"
                        >
                          <FiPlus size={14} />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openFolderSettings(folder);
                          }}
                          className="p-1 rounded-full hover:bg-gray-700"
                          aria-label="Folder settings"
                        >
                          <FiSettings size={14} />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
                
                {expandedFolders[folder.id] && (
                  <ul className={`p-2 pl-8 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                    {resources
                      .filter(resource => resource.folderId === folder.id)
                      .map(resource => (
                        <li key={resource.id} className="py-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FiFile className="mr-2 opacity-70" />
                              <span>{resource.name}</span>
                              {resource.type === 'paid' && (
                                <div className="ml-2 px-1.5 py-0.5 text-xs rounded bg-accent text-white flex items-center">
                                  <FiDollarSign size={10} className="mr-0.5" />
                                  {resource.price}
                                </div>
                              )}
                            </div>
                          </div>
                          {resource.description && (
                            <p className="ml-6 mt-1 text-sm opacity-70">{resource.description}</p>
                          )}
                        </li>
                      ))}
                    {resources.filter(resource => resource.folderId === folder.id).length === 0 && (
                      <li className="py-2 text-sm opacity-70">No resources yet</li>
                    )}
                    {(isAdmin || folder.permission === 'members') && (
                      <li className="pt-2">
                        <button
                          onClick={() => openAddResourceModal(folder.id)}
                          className="text-sm text-primary hover:underline flex items-center"
                        >
                          <FiPlus size={14} className="mr-1" /> Add resource
                        </button>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResourcesSection;
