import { createContext, useContext, useState, useEffect } from 'react';

const CommunityContext = createContext();

export const useCommunity = () => useContext(CommunityContext);

export const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    // Initialize with sample data
    const sampleCommunities = [
      {
        id: '1',
        name: 'Electronic Music Producers',
        description: 'A community for electronic music producers to share tips, collaborate, and grow together.',
        image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        memberCount: 1250,
        createdAt: '2023-01-15T10:30:00Z',
        category: 'Production',
        isPrivate: false
      },
      {
        id: '2',
        name: 'Indie Artists Collective',
        description: 'Independent artists supporting each other through the journey of creating and releasing music.',
        image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        memberCount: 843,
        createdAt: '2023-02-20T14:45:00Z',
        category: 'Indie',
        isPrivate: false
      },
      {
        id: '3',
        name: 'Hip-Hop Beatmakers',
        description: 'For producers and beatmakers focused on hip-hop, trap, and related genres.',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        memberCount: 1678,
        createdAt: '2023-03-05T09:15:00Z',
        category: 'Hip-Hop',
        isPrivate: false
      }
    ];
    
    setCommunities(sampleCommunities);
  }, []);

  // In a real app, these would make API calls
  const getCommunities = () => {
    // Placeholder for API call
    return communities;
  };

  const getCommunity = (id) => {
    return communities.find(community => community.id === id);
  };

  const createCommunity = (communityData) => {
    const newCommunity = {
      id: Date.now().toString(),
      ...communityData,
      createdAt: new Date().toISOString(),
      memberCount: 1
    };
    setCommunities([...communities, newCommunity]);
    return newCommunity;
  };

  const joinCommunity = (communityId) => {
    setCommunities(communities.map(community => 
      community.id === communityId 
        ? { ...community, memberCount: community.memberCount + 1 } 
        : community
    ));
  };

  const leaveCommunity = (communityId) => {
    setCommunities(communities.map(community => 
      community.id === communityId 
        ? { ...community, memberCount: Math.max(0, community.memberCount - 1) } 
        : community
    ));
  };

  return (
    <CommunityContext.Provider value={{ 
      communities, 
      getCommunities, 
      getCommunity, 
      createCommunity, 
      joinCommunity, 
      leaveCommunity 
    }}>
      {children}
    </CommunityContext.Provider>
  );
};
